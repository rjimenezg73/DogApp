const express = require('express');
const router = express.Router();
const { Dog, Temperaments } = require("../db.js");
const { getAll } = require('../controllers/controllerAPI-DB');

router.get('/', async (req, res) => {
  const dogName = req.query.name;  
  const allDogs = await getAll()
  if(dogName){
    //si pasan x query un perro se fija si lo tiene, si es así lo devuelve sino devuelve todo
    const filteredDog = await allDogs.filter(dog => dog.name.toLowerCase().includes(dogName.toLowerCase())) 
    filteredDog.length
      ? res.status(200).send(filteredDog)
      : res.status(404).send('Dog not found :(')
  } else { 
    res.status(200).send(allDogs)
  }
})

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
})

module.exports = router;