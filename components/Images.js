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
import { getResultThunk } from '../store';
import ImageDetailModal from './ImageDetailModal';

class Images extends Component {

  constructor() {
    super();
    this._renderImages = this._renderImages.bind(this);
    this._renderWait = this._renderWait.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getMoreImages = this.getMoreImages.bind(this);
    this.state = {
      showModal: false,
      image: '',
      currPage: 1
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

  getMoreImages = () => {
    const currPage = ++this.state.currPage;
    this.setState({ currPage });
    console.log('i am called ', currPage);
    this.props.getResult('Nepal', currPage);
  }

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
        onEndReachedThreshold={0.5}
        onEndReached={this.getMoreImages}
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
    // console.log('images are ', images)
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

const mapDispatch = dispatch => {
  return {
    getResult: search => {
      const action = getResultThunk(search, 2);
      dispatch(action);
    }
  }
}

const ImagesContainer = connect(mapState, mapDispatch)(Images);
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
