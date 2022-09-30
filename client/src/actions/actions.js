import axios from 'axios'

export function getDogs () {
  return async function (dispatch){
    return await axios.get('http://localhost:3001/dogs')
    .then(res => {
      dispatch({
        type: 'GET_DOGS',
        payload: res.data
      })
    })
  }
}

export function getTemperaments () {
  return async function (dispatch){
    return await axios.get('http://localhost:3001/temperaments')
    .then(res => {
      dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: res.data
      })
    })
  }
}

// export function filterDogByStatus(payload){
//   console.log(payload);
//   return{
//     type: 'FILTER_BY_STATUS',
//     payload
//   }
// }

export function sortByName (payload) {
  return{
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function sortByWeight (payload) {
  return{
    type: 'ORDER_BY_WEIGHT',
    payload
  }
}

export function getByName (name) {
  return async function (dispatch){
    try {
      var res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      return(
        dispatch({
          type: 'GET_BY_NAME',
          payload: res.data
        })
      )
    } catch (e) {
      return(
        dispatch({
          type: 'GET_BY_NAME',
          payload: e.response.data
        })
      )
    }
  }
}

export function getById (id) {
  return async function (dispatch){
    try {
      var res = await axios.get(`http://localhost:3001/dogs/${id}`)
      return(
        dispatch({
          type: 'GET_BY_ID',
          payload: res.data
        })
      )
    } catch (e) {
      return(
        dispatch({
          type: 'GET_BY_ID',
          payload: e.response.data
        })
      )
    }
  }
}

export function clearDetail () {
  return {
    type: 'CLEAR_DETAIL'
  }
}

export function filterByTemperament (payload) {
  return{
    type: 'FILTER_BY_TEMPERAMENT',
    payload
  }
}

export function filterCreated (payload) {
  return{
    type: 'FILTER_CREATED',
    payload
  }
}

export function createDogs (payload) {
  return async function (dispatch){
    var res = await axios.post(`http://localhost:3001/dogs/`, payload)
    return(
      dispatch({
        type: 'CREATE_DOG',
        payload: res.data
      })
    )
  }
}

export function deleteDog (id) {
  return async function (dispatch){
    var res = await axios.delete(`http://localhost:3001/dogs/` + id)
    return(
      dispatch({
        type: 'DELETE_DOG',
        payload: res.data
      })
    )
  }
}

export function editDog (payload, id) {
  return async function (dispatch){
    var res = await axios.put(`http://localhost:3001/dogs/${id}/edit`, payload)
    return(
      dispatch({
        type: 'EDIT_DOG',
        payload: res.data
      })
    )
  }
}