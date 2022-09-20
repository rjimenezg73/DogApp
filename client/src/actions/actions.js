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