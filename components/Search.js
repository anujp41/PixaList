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
import { getResultThunk } from '../store';

class Search extends Component {

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.showToast = this.showToast.bind(this);
    this.state = {
      search: ''
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

  render() {
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
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getResult: search => {
      const action = getResultThunk(search, 1);
      dispatch(action);
    }
  }
}

const SearchContainer = connect(null, mapDispatch)(Search);
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
  }
});
