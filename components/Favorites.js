'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { connect } from 'react-redux';
// import Toast from 'react-native-easy-toast';
// import { getResultThunk } from '../store';

export default class Favorites extends Component {

  render() {
    return (
      <View >
        <Text>All your favorites in one place!</Text>
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

// const SearchContainer = connect(null, null)(Search);
// export default SearchContainer;