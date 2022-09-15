const axios = require("axios");
const { Dog, Temperaments } = require("../db");
const { API_KEY, API_URL } = process.env;

// Llamado a API Dogs para recuperar los datos a utilizar
const dataApi = async () => {
  const apiDogs = await axios.get(`${API_URL}?api_key=${API_KEY}`)
  const infoDogs = await apiDogs.data.map(dog => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,  
      image: dog.image.url,
      temperaments: dog.temperament
    }
  })
  return infoDogs
}

// Llamado a la información contenida en nuestra DB
const dataDB = async () => {
  return await Dog.findAll({
    // Llamamos para obtener todos los datos del dog, y además incluya los temperamentos asociados a cada dog
    include: {
      model: Temperaments,
      attributes: ['name'],
      through:{
        attributes: []
      }
    }
  })
}

// Concatenamos ambos modelos
const getAll = async () => {
  const infoDataApi = await dataApi()
  const infoDataDB = await dataDB()
  const allData = infoDataApi.concat(infoDataDB)
  return allData
}

module.exports={
  dataApi,
  dataDB,
  getAll
}