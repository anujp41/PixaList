'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { loginGoogleThunk } from '../store';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { auth, googleAuthProvider } from '../firebase';

class Login extends Component {

  constructor() {
    super();
    this.checkCurrUser = this.checkCurrUser.bind(this);
    this._renderLogin = this._renderLogin.bind(this);
    this._renderGo = this._renderGo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    try{
      if(Platform.OS === "ios"){
        GoogleSignin.configure({
          iosClientId:"3753807255-oqtr44njdrpueh6fgl9skbt4cpu6r8rr.apps.googleusercontent.com"
        });
      } else if (Platform.OS === "android") {
        GoogleSignin.hasPlayServices({ autoResolve: true });
        GoogleSignin.configure({
        //to add id for android 
        });
      }
    }
    catch (error) {
      console.log('error checking platform ', error)
    }
    this.checkCurrUser();
  }

  async checkCurrUser() {
    const user = await GoogleSignin.currentUserAsync();
    this.setState({ user });
  }
  
  componentDidMount() {
    console.disableYellowBox = true;
  }

  logOut() {
    GoogleSignin.signOut()
    // .then(() => auth.signOut())
    .then(() => {
      console.log('signed out of firebase')
      this.setState({ user: null})
      auth.signOut()
      .then(() => console.log('user logged out'))
      .catch(() => console.log('error logging out user'))
    })
  }

  _renderLogin() {
    return (
      <TouchableHighlight style={styles.button} underlayColor='#426ed6' onPress={this.props.loginGoogle}>
          <View flexDirection='row'>
            <GoogleSigninButton
              style={{width: 48, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
            />
          <Text style={styles.buttonText}>Login with Google!</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderGo(user) {
    return (
      <TouchableHighlight style={styles.button} underlayColor='#426ed6' onPress={this.logOut}>
          <View flexDirection='row'>
          <Text style={styles.buttonText}>Welcome {user.givenName}, log out!</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const currUser = this.state.user;
    console.log('current user is ', currUser)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text style={{fontWeight:'bold', fontSize:50}}>Welcome to PixaList!</Text>{'\n'}
          <Text style={{fontSize:30}}>Image search powered by:</Text>{'\n'}
          <Image source={{uri: 'data:image/png;base64,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'}} style={{width:150, height: 100}} resizeMode={'contain'}/>
        </Text>

        {
          currUser && currUser.givenName
          ? this._renderGo(currUser)
          : this._renderLogin(currUser)
        }
        

      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    loginGoogle: () => {
      const action = loginGoogleThunk();
      dispatch(action);
    }
  }
}

const LoginContainer = connect(null, mapDispatch)(Login);
export default LoginContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'cochin'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderRadius: 8,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
