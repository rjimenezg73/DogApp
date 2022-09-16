const express = require('express');
const router = express.Router();
const { Dog, Temperaments } = require("../db.js");
const { getAll } = require('../controllers/controllerAPI-DB');

router.get('/', async (req, res) => {
  const dogName = req.query.name;  
  const allDogs = await getAll();
  if(dogName){
    //si pasan x query un perro se fija si lo tiene, si es así lo devuelve sino devuelve todo
    const filteredDog = await allDogs.filter(dog => dog.name.toLowerCase().includes(dogName.toLowerCase()));
    filteredDog.length
      ? res.status(200).send(filteredDog)
      : res.status(404).send('Dog not found...')
  } else { 
    res.status(200).send(allDogs);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const dogID = req.params.id
    const allDogs = await getAll()
    if (dogID) {
      const filteredDog = await allDogs.find(dog => dog.id == dogID);
      filteredDog
        ? res.status(200).send(filteredDog)
        : res.status(404).send('Dog not found :(')
    }
  } catch (e) {
    console.log(e);
  }
});

// Procesa los datos desde el formulario para almacenar en la BD
router.post('/', async (req, res) => {
  try {
    const {name, height_min, height_max, weight_min, weight_max, image, life_span_min, life_span_max, temperaments, DB_created} = req.body
  
    if (name && height_min && height_max && weight_min && weight_max){
      const newDog = await Dog.create({
        name: name[0].toUpperCase() + name.slice(1), 
        height: `${height_min} - ${height_max}`, 
        weight: `${weight_min} - ${weight_max}`, 
        life_span: life_span_min && life_span_max ? `${life_span_min} - ${life_span_max} years` : null, 
        image: image ? image : 'https://i.redd.it/n2713a0i3ge81.jpg', 
        DB_created
      })
      const temperamentAux = await Temperaments.findAll({
        where:{
          name: temperaments
        }
      })
      newDog.addTemperaments(temperamentAux)
      res.status(201).send('¡Dog creado satisfactoriamente!')
    } else res.status(400).send('Bad request')
    
  } catch (e) {
    console.log('Algo no se concretó con post/dogs:', e);
  }
})
router.delete('/:id', async (req, res) => {
  const id = req.params.id 
  try {
    if (id) {
      const deleteDog = await Dog.findOne({
        where: { id: id }
      })
      if (deleteDog) {
        await deleteDog.destroy()
        res.status(200).send('The dog was successfully deleted from existence')
      }
      else res.status(404).send('Dog ID not found')
    } else res.status(400).send("Something went wrong.");
  } catch (e) {
    console.log('error try catch', e);
    res.status(400).send('Dog ID is wrong typed')
  }
})

router.put('/:id/edit', async (req,res) => {
  const id = req.params.id
  
  try {
    const editableDog = await Dog.findByPk(id)

    if (Object.keys(editableDog).length) {
      if(req.body.name) req.body.name = req.body.name[0].toUpperCase() + req.body.name.slice(1) //si modifican el name, lo paso a mayus
      
      await Dog.update(req.body, { //método de sequelize. recibe dos params ({obj con datos a actualizar}, {where hacerlo})
        where: { id: id}
      })

      if (req.body.temperaments) { //seteo los temperamentos solamente si me los pasan x body (si no lo hago tira error)
        const temperamentAux = await Temperaments.findAll({
          where:{
            name: req.body.temperaments
          }
        })
        editableDog.setTemperaments(temperamentAux)
      }

      res.status(200).send('The dog was successfully edited!')
    }
    else res.status(404).send('Dog ID not found')
  
  } catch (e) {
    console.log('error PUT try catch', e);
    res.status(400).send('Dog ID is wrong typed')
  }
})


module.exports = router;