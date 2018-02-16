import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

class Images extends Component {

  constructor() {
    super();
    this._renderImages = this._renderImages.bind(this);
    this._renderWait = this._renderWait.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  keyExtractor = image => image.id;

  _renderItem = ({item}) => {
    return <Image source={{uri: item.previewURL}} style={{width: 150, height: 150}}/>
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
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  render() {
    console.log('original ', this.props.images)
    const images = JSON.parse(JSON.stringify(this.props.images));
    console.log('these are ', images)
    return (
      <View style={styles.container}>
        {images.length 
        ? this._renderImages(images)
        : this._renderWait()}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
