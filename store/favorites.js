import { database } from '../firebase';

const ADD_FAVES = 'ADD_FAVES';
const GET_FAVES = 'GET_FAVES';

let favorites = [];

const getFaves = favorites => {
  const action = { type: GET_FAVES, favorites };
  return action;
}

const addFaves = images => {
  const action = { type: ADD_FAVES, image };
  return action;
}

export const getFavesThunk = () => dispatch => {
  database.ref('favorits').once('vale')
  .then(snapshot => console.log('i got your favorites ', snapshot.val()))
}

export const addFavesThunk = (image) => dispatch => {
  const key = image.id;
  database.ref('favorites').child(key).update(image)
  //add code that adds to the favorite field
}

export default (state = favorites, action) => {
  switch (action.type) {
    case GET_FAVES:
      return action.favorites

    case ADD_FAVES:
      return action.favorites

    default:
      return state;
  }
}