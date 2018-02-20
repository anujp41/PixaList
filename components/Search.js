import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { getResultThunk } from '../store';

class Search extends Component {

  constructor() {
    super();
    this.state = {
      search: 'Nepal'
    }
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const search = this.state.search;
    this.props.getResult(search);
    this.props.navigation.navigate('Images', {search});
  }

  render() {
    return (
      <View >
        <TextInput
          style={styles.instructions}
          placeholder="Search for that picture...."
          value={this.state.search}
          onChangeText={(search) => this.setState({search})}
        />
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onPress}>
          <Text style={styles.buttonText}>Search PixaBay</Text>
        </TouchableHighlight>
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
  instructions: {
    marginTop: 25,
    height: 25,
    textAlign: 'center',
    color: '#333333',
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25
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
  }
});
