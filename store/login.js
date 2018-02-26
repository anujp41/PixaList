import firebase from '../firebase';
import { GoogleSignin } from 'react-native-google-signin';

const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

let user = {};

const loginGoogle = user => {
  const action = { type: LOGIN_GOOGLE, user };
  return action;
}

export const loginGoogleThunk = () => dispatch => {
  GoogleSignin.signIn()
  .then((data) => {
    // Create a new Firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    // Login with the credential
    return firebase.auth().signInWithCredential(credential);
  })
  .then((user) => {
    console.log('my user is ', user)
    // If you need to do anything with the user, do it here
    // The user will be logged in automatically by the
    // `onAuthStateChanged` listener we set up in App.js earlier
  })
  .catch((error) => {
    const { code, message } = error;
    // For details of error codes, see the docs
    // The message contains the default Firebase string
    // representation of the error
  });
}


export default (state = user, action) => {
  switch (action.type) {
    case LOGIN_GOOGLE:
      return action.user;

    default:
      return state;
  }
}