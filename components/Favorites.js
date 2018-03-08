'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  VirtualizedList,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements'
import { removeFaveThunk } from '../store';

class Favorites extends Component {

  constructor() {
    super();
    this._renderCard = this._renderCard.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  keyExtractor = image => image.id;

  _renderCard({item}) {
    return (
      <Card
        title={item.tags}
        image={{uri:item.webformatURL}}
        containerStyle={{width: 250}}>
        <TouchableHighlight onPress={() => this.props.removeFave(item)} underlayColor='#ed3d3d' style={styles.icon}>
          <Icon name='favorite' color='red' />
        </TouchableHighlight>
        <Text style={{marginBottom: 10}}>
          <Text style={{fontWeight: 'bold'}}>Uploaded by: </Text><Text>{item.user}</Text>{'\n'}{'\n'}
          <Text style={{fontWeight: 'bold'}}>Tags: </Text><Text>{item.tags}</Text>{'\n'}{'\n'}
          <Text style={{fontWeight: 'bold'}}>Resolution: </Text><Text>{item.webformatWidth} X {item.webformatHeight}</Text>
        </Text>
      </Card>
    )
  }

  render() {
    const favorites = this.props.favorites;
    return (
      <View>
        {
          favorites.length 
          ?
            <FlatList
              keyExtractor={this.keyExtractor}
              data={favorites}
              horizontal={true}
              renderItem={this._renderCard}
            />
          :
          <Text>All you favorites in one place!</Text>
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

const mapDispatch = dispatch => {
  return {
    removeFave: item => {
      const action = removeFaveThunk(item);
      dispatch(action);
    }
  }
}

const FavoritesContainer = connect(mapState, mapDispatch)(Favorites);
export default FavoritesContainer;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height:25,
    flexWrap: 'nowrap',
    marginBottom: 10
  }
})