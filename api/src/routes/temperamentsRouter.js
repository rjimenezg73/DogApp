const express = require('express');
const router = express.Router();
const { Temperaments } = require("../db.js");
const { dataApi } = require('../controllers/controllerAPI-DB');


router.get('/', async (req,res) => {
  const infoApi = await dataApi();
  const temperaments = infoApi.map(dog => dog.temperaments).join().split(',');
  const temperamentsForDB = temperaments.map(e => e.trim());
  temperamentsForDB.forEach(e => {
    if(e) {
      //Buscar el elemento en la tabla, si no lo encuentra crea la nueva entrada
      Temperaments.findOrCreate({ 
        where: {
          name: e
        }
      })
    }
  })
  
  const allTemperaments = await Temperaments.findAll();
  res.status(200).send(allTemperaments);
})

module.exports = router;