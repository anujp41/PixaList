import firebase from '../firebase';

const GET_FAVES = 'GET_FAVES';

let favorites = [];

const getFaves = favorites => {
  const action = { type: GET_FAVES, favorites };
  return action;
}

export const getFavesThunk = () => dispatch => {
  console.log('i am getting')
}

export default (state = favorites, action) => {
  switch (action.type) {
    case GET_FAVES:
      return action.favorites

    default:
      return state;
  }
}