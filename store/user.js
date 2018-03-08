import firebase from '../firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { auth, googleAuthProvider } from '../firebase';

const SET_USER = 'SET_USER';

let user = {};

export const setUser = user => {
  const action = { type: SET_USER, user };
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
        dispatch(setUser(newUser))
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
    case SET_USER:
      return action.user;

    default:
      return state;
  }
}