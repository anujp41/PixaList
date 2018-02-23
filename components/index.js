export { default as Login } from './Login';
export { default as Search } from './Search';
export { default as Images } from './Images';
export { default as Favorites } from './Favorites';

import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { AppScreens } from '../navigation/router';
import store from '../store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppScreens />
      </Provider>
    );
  }
}