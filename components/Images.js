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
import Toast, { DURATION } from 'react-native-easy-toast';

class Images extends Component {

  constructor(props) {
    super(props);
    this._renderImages = this._renderImages.bind(this);
    this._renderWait = this._renderWait.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getMoreImages = this.getMoreImages.bind(this);
    this.showToast = this.showToast.bind(this);
    this.state = {
      showModal: false,
      image: null,
      currPage: 1,
      search: '',
      totalImages: null
    }
  }

  componentDidMount() {
    const { search } = this.props.navigation.state.params;
    const { totalImages } = this.props;
    this.setState({ search, totalImages });
  }

  toggleModal = image => {
    this.setState({
      image ,
      showModal: !this.state.showModal,
    })
  }

  keyExtractor = image => image.id;

  showToast = () => this.refs.toast.show('All images have been served!', 2000)

  getMoreImages = () => {
    let { currPage, search } = this.state;
    const { images, totalImages } = this.props;
    if (totalImages <= images.length) {
      this.showToast()
    } else {
      this.setState({ currPage: ++currPage })
      this.props.moreResult(search, currPage)
    }
  }

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() => this.toggleModal(item)}>
        <Image source={{uri: item.previewURL}} style={styles.image}/>
      </TouchableHighlight>
    )
  }

  _renderImages(images) {
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

  _renderText() {
    return (
      <Text>Your search did not return any result!</Text>
    )
  }

  render() {
    const { images } = this.props;
    return (
      <View style={styles.container}>
        {images  
        ? images.length 
            ? this._renderImages(images) 
            : this._renderText()
        : this._renderWait()}
        {this.state.showModal && <ImageDetailModal visible={this.state.showModal} toggleModal={this.toggleModal} image={this.state.image} />}
        <Toast ref="toast" fadeInDuration={500} fadeOutDuration={1000}/>
      </View>
    )
  }
}

const mapState = state => {
  return {
    images: state.result.hits,
    totalImages: state.result.totalHits
  }
}

const mapDispatch = dispatch => {
  return {
    moreResult: ( search, page ) => {
      const action = getResultThunk(search, page);
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
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5
  }
});
