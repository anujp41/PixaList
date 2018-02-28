import firebase from '../firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { auth, googleAuthProvider } from '../firebase';

const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

let user = {};

const loginUser = user => {
  const action = { type: LOGIN_GOOGLE, user };
  return action;
}

export const loginGoogleThunk = () => dispatch => {
  try {
    GoogleSignin.signIn()
    .then((user) => {
      const credential = googleAuthProvider.credential(user.idToken);
      auth.signInWithCredential(credential)
      .then(firebaseUser => {
        const newUser = {...user, uid: firebaseUser.uid}
        dispatch(loginUser(newUser))
        });
      })
      .catch((err) => {
        console.log("WRONG SIGNIN", err);
      })
      .done();
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
}


export default (state = user, action) => {
  switch (action.type) {
    case LOGIN_GOOGLE:
      return action.user;

    default:
      return state;
  }
}