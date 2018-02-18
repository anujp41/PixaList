import axios from 'axios';
import { pixabayKey } from '../pixaBayKey';

const GET_RESULTS = 'GET_RESULTS';

let result = [];

const getResult = result => {
  const images = result.hits;
  const action = { type: GET_RESULTS, images };
  return action;
}

export const getResultThunk = (searchItem, page) => dispatch => {
  const search = searchItem.replace(' ', '+');
  axios.get(`https://pixabay.com/api/?key=${pixabayKey.key}&q=${search}&image_type=photo&per_page=200&page=${page}`)
  // .then(images => console.log('here are ', images))
  .then(result => dispatch(getResult(result.data)))
}

export default (state = result, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return [...state, ...action.images]

    default:
      return state;
  }
}