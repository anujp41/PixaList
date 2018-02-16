'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import ImageDetailModal from './ImageDetailModal';

class Images extends Component {

  constructor() {
    super();
    this._renderImages = this._renderImages.bind(this);
    this._renderWait = this._renderWait.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      showModal: false,
      image: ''
    }
  }

  toggleModal = image => {
    if (image === undefined) image = ''
    this.setState({
      image ,
      showModal: !this.state.showModal,
    })
  }

  keyExtractor = image => image.id;

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() => this.toggleModal(item)}>
        <Image source={{uri: item.previewURL}} style={styles.image}/>
      </TouchableHighlight>
    )
  }

  _renderImages(images) {
    const link = images[0].previewURL;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={images}
        numColumns={2}
        renderItem={this._renderItem}
      />
    )
  }

  _renderWait() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching Images...</Text>
      </View>
    )
  }

  render() {
    const images = this.props.images;
    return (
      <View style={styles.container}>
        {images.length 
        ? this._renderImages(images)
        : this._renderWait()}
        <ImageDetailModal visible={this.state.showModal} toggleModal={this.toggleModal} image={this.state.image} />
      </View>
    )
  }
}

const mapState = state => {
  return {
    images: state.result
  }
}

const ImagesContainer = connect(mapState, null)(Images);
export default ImagesContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 150,
    width: 150
  },
});
