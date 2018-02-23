'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements'

class Favorites extends Component {

  render() {
    const favorites = this.props.favorites;
    const item = favorites['384'];
    return (
        <View >
          {item 
          ?
          <Card
          title='HELLO WORLD'
          image={{uri:item.webformatURL}}>
          <TouchableHighlight onPress={() => console.log('to be removed')} underlayColor='#ed3d3d' style={styles.icon}>
            <Icon name='favorite' color='red' />
          </TouchableHighlight>
          <Text style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Uploaded by: </Text><Text>{item.user}</Text>{'\n'}{'\n'}
            <Text style={{fontWeight: 'bold'}}>Tags: </Text><Text>{item.tags}</Text>{'\n'}{'\n'}
            <Text style={{fontWeight: 'bold'}}>Resolution: </Text><Text>{item.webformatWidth} X {item.webformatHeight}</Text>
          </Text>
        </Card>
          :
          <Text>All your favorites in one place!</Text>
          }
      </View>
    )
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

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height:25,
    flexWrap: 'nowrap',
    marginBottom: 10
  }
})