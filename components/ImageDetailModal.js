import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Input, Image } from 'react-native';
import Modal from 'react-native-modal';

export default class ImageDetailModal extends Component {

  closeModal = () => {
    this.props.toggleModal();
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
          >
          <View style={styles.modalContainer}>
            <Button
                onPress={() => this.closeModal()}
                title='X'
            />
              <Text style={styles.font} >
                <Text style={styles.title} >Image Details:{'\n'}</Text>
                <Image source={{uri: image.previewURL}} style={{width: 150, height: 150}}/>
                <Text>"{image.id}"</Text>
              </Text>
            </View>
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
    fontWeight: 'bold'
  }
});