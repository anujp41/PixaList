'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

class Favorites extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <View >
        <Text>All your favorites in one place!</Text>
      </View>
    );
  }
}

const mapState = state => {
  return {
    favorites: state.favorites
  }
}

// const mapDispatch = dispatch => {
//   return {
//     getResult: search => {
//       const action = getResultThunk(search, 1);
//       dispatch(action);
//     }
//   }
// }

const FavoritesContainer = connect(mapState, null)(Favorites);
export default FavoritesContainer;