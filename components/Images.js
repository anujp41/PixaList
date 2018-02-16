import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

class Images extends Component {

  // constructor() {
  //   super();
  //   this._renderImages = this._renderImages.bind(this);
  //   this._renderWait = this._renderWait.bind(this);
  // }

  // _renderImages() {
  //   return (<View style={styles.container}>
  //       <Text style={styles.welcome}>These are the results</Text>
  //   </View>)
  // }

  // _renderWait() {
  //   return <ActivityIndicator size="large" color="#0000ff" />
  // }

  render() {
    const images = JSON.parse(JSON.stringify(this.props.images));
    console.log('these are ', images, typeof images ,images.length)
    return (
      <View style={styles.container}>
        {images.length 
        ? <Text style={styles.welcome}>These are the results</Text>
        : <ActivityIndicator size="large" color="#0000ff" />}
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
