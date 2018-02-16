import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, Input } from 'react-native';

export default class ImageDetailModal extends Component {

  closeModal = () => {
    this.props.toggleModal();
  }

  render() {
    const modalVisible = this.props.visible;
    const image = this.props.image;
    return (
        <View style={styles.container}>
          <Modal
              visible={modalVisible}
              animationType={'slide'}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Button
                    onPress={() => this.closeModal()}
                    title="Close"
                />
                  <Text>Please add more details to the step:</Text>
                  <Text>"{image.id}"</Text>
              </View>
            </View>
          </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50%'
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