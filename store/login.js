import firebase from '../firebase';
import { GoogleSignin } from 'react-native-google-signin';

const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

let user = {};

const loginGoogle = user => {
  const action = { type: LOGIN_GOOGLE, user };
  return action;
}

export const loginGoogleThunk = () => dispatch => {
}


export default (state = user, action) => {
  switch (action.type) {
    case LOGIN_GOOGLE:
      return action.user;

    default:
      return state;
  }
}