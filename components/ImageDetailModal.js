import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

export default class ImageDetailModal extends Component {

  closeModal = () => {
    this.props.toggleModal(null);
  }

  render() {
    const modalVisible = this.props.visible;
    const image = this.props.image;
    return (
          <Modal
              isVisible={modalVisible}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
              supportedOrientations={['portrait', 'landscape']}
              style={{justifyContent: 'center', alignItems: 'center'}}
          >
          <ScrollView>
            <View style={styles.modalContainer}>
                <Text style={styles.font} >
                  <Text style={styles.title} >Image Details:</Text>{'\n'}{'\n'}
                  <Image source={{uri: image.webformatURL}} style={styles.image} />{'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Uploaded by: </Text><Text>{image.user}</Text>{'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Tags: </Text><Text>{image.tags}</Text>{'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Resolution: </Text><Text>{image.webformatWidth} X {image.webformatHeight}</Text>
                </Text>
                <TouchableHighlight style={styles.button} onPress={this.closeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  font: {
    fontFamily: 'Cochin',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    color: '#f499da',
    fontWeight: 'bold'
  },
  button: {
    height: 36,
    backgroundColor: '#99f4c9',
    borderColor: '#99f4c9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 25,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 250
  }
});