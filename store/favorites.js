import { database } from '../firebase';

const ADD_FAVES = 'ADD_FAVES';
const GET_FAVES = 'GET_FAVES';
const REMOVE_FAVE = 'REMOVE_FAVE';

let favorites = {};

const getFaves = favorites => {
  const action = { type: GET_FAVES, favorites };
  return action;
}

const addFaves = images => {
  const action = { type: ADD_FAVES, image };
  return action;
}

const removeFave = image => {
  const action = { type: REMOVE_FAVE, image };
  return action;
}

export const getFavesThunk = () => dispatch => {
  database.ref('favorites').once('value')
  .then(snapshot => dispatch(getFaves(snapshot.val())))
}

export const addFavesThunk = (image) => dispatch => {
  const key = image.id;
  database.ref('favorites').child(key).update(image)
  //add code that adds to the favorite field
}

export const removeFaveThunk = (image) => dispatch => {
  database.ref('favorites').child(image.id).remove()
  dispatch(removeFave(image))
}

export default (state = favorites, action) => {
  switch (action.type) {
    case GET_FAVES:
      return action.favorites;

    case ADD_FAVES:
      return action.favorites;

    case REMOVE_FAVE:
      delete state[action.image.id]
      return state;

    default:
      return state;
  }
}