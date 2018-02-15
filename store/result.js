import axios from 'axios';
import { pixabayKey } from '../pixaBayKey';

const GET_RESULTS = 'GET_RESULTS';

let result = [];

const getResult = result => {
  const action = { type: GET_RESULTS, result };
  return action;
}

export const getResultThunk = searchItem => dispatch => {
  console.log('bay ', pixabayKey)
  axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${searchItem}&image_type=photo`)
  .then(result => dispatch(getResult(result.data)))
}

export default (state = result, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return action.result

    default:
      return state;
  }
}