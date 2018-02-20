import axios from 'axios';
import { pixabayKey } from '../pixaBayKey';

const GET_RESULTS = 'GET_RESULTS';
const MORE_RESULTS = 'MORE_RESULTS';

let result = [];

const getResult = result => {
  const { totalHits, hits } = result;
  const action = { type: GET_RESULTS, result: { totalHits, hits } };
  return action;
}

const moreResult = result => {
  const images = result.hits;
  const action = { type: MORE_RESULTS, images };
  return action;
}

export const getResultThunk = (searchItem, page) => dispatch => {
  const search = searchItem.replace(' ', '+');
  axios.get(`https://pixabay.com/api/?key=${pixabayKey.key}&q=${search}&image_type=photo&per_page=40&page=${page}`)
  .then(result => page === 1 ? dispatch(getResult(result.data)) : dispatch(moreResult(result.data)))
}

export default (state = result, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return action.result

    case MORE_RESULTS:
      const result = {
        totalHits: state.totalHits,
        hits: [...state.hits, ...action.images]
      }
      return result

    default:
      return state;
  }
}