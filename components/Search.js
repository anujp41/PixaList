import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight
} from 'react-native';


class Search extends Component {

  constructor() {
    super();
    this.state = {
      search: ''
    }
  }
  render() {
    console.log('my state ', this.state.search)
    return (
      <View >
        <TextInput
          style={styles.instructions}
          placeholder="Search for that picture...."
          onChangeText={(search) => this.setState({search})}
        />
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onPress}>
          <Text style={styles.buttonText}>Search PixaBay</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  instructions: {
    marginTop: 25,
    height: 25,
    textAlign: 'center',
    color: '#333333',
    borderBottomWidth: 1
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
