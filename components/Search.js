'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { getResultThunk, getFavesThunk } from '../store';
import { GoogleSignin } from 'react-native-google-signin';

class Search extends Component {

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.showToast = this.showToast.bind(this);
    this.goToFavorites = this.goToFavorites.bind(this);
    this.state = {
      search: 'Nepal'
    }
  }

  showToast() {
    this.refs.toast.show('Nothing to search for! Please type in the search bar.', 500);
  }

  onPress() {
    const search = this.state.search;
    if (search.length === 0) return this.showToast();
    this.props.getResult(search);
    this.props.navigation.navigate('Images', {search});
    Keyboard.dismiss();
  }

  goToFavorites(user) {
    this.props.getFaves(user.uid);
    this.props.navigation.navigate('Favorites');
  }

  render() {
    const user = this.props.user;
    console.log('the user is ', user)
    return (
      <View >
        <TextInput
          style={styles.searchBox}
          placeholder="Click to search for that picture...."
          value={this.state.search}
          onChangeText={(search) => this.setState({search})}
          disableFullscreenUI={true}
        />
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onPress}>
          <Text style={styles.buttonText}>Check PixaBay for item</Text>
        </TouchableHighlight>
        <Toast ref="toast" fadeInDuration={250} position='top' style={styles.toast} textStyle={{color:'black'}}/>


        <View style={styles.container}>
          <Text style={styles.welcome}>
            Or, you can go check your favorites!
          </Text>
          <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={() => this.goToFavorites(user)}>
            <Text style={styles.buttonText}>Favorites</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.login
  }
}

const mapDispatch = dispatch => {
  return {
    getResult: search => {
      const action = getResultThunk(search, 1);
      dispatch(action);
    },
    getFaves: (userUid) => {
      const action = getFavesThunk(userUid);
      dispatch(action);
    }
  }
}

const SearchContainer = connect(mapState, mapDispatch)(Search);
export default SearchContainer;

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 25,
    textAlign: 'center',
    color: '#333333',
    height: 50,
    fontSize: 20,
    ...Platform.select({
      ios: {
        borderBottomWidth: 1
      }
    }),
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 25,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  toast: {
    backgroundColor: '#baf26d'
  },
  container: {
    marginTop: 100,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});