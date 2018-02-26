import firebase from '../firebase';

const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

let user = {};

const loginGoogle = user => {
  const action = { type: LOGIN_GOOGLE, user };
  return action;
}

export const loginGoogleThunk = () => dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    const token = result.credential.accessToken;
    const user = result.user;

    console.log('token is ', token)
    console.log('i have logged in ', user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
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