import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Input } from 'react-native';
import Modal from 'react-native-modal';

export default class ImageDetailModal extends Component {

  closeModal = () => {
    this.props.toggleModal();
  }

  render() {
    const modalVisible = this.props.visible;
    const image = this.props.image;
    return (
        <View>
          <Modal
              isVisible={modalVisible}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
          >
            <View style={styles.modalContainer}>
                <Button
                    onPress={() => this.closeModal()}
                    title="Close"
                />
                  <Text>Please add more details to the step:</Text>
                  <Text>"{image.id}"</Text>
            </View>
          </Modal>
        </View>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    width : '75%',
  }
});