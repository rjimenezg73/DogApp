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

export function filterDogByStatus(payload){
  console.log(payload);
  return{
    type: 'FILTER_BY_STATUS',
    payload
  }
}