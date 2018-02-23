import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

export default class ImageDetailModal extends Component {

  constructor() {
    super();
    this.addToFav = this.addToFav.bind(this);
    this.showToast = this.showToast.bind(this);
    this.state = {
      likes: false
    }
  }

  showToast() {
    this.refs.fav.show('Image added to Favorites!', 1000)
  }

  addToFav() {
    if (this.state.likes) return;
    this.showToast();
    this.setState({ likes: !this.state.likes});
  }

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
                  <Image source={{uri: image.webformatURL}} style={styles.image} />
                  <View style={styles.icon}>
                    <TouchableHighlight onPress={this.addToFav} underlayColor='#ed3d3d'>
                      { this.state.likes
                        ?
                        <Icon name='favorite' color='red'/>
                        :
                        <Icon name='favorite-border' />
                        }
                    </TouchableHighlight>
                  </View>
                  {'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Uploaded by: </Text><Text>{image.user}</Text>{'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Tags: </Text><Text>{image.tags}</Text>{'\n'}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Resolution: </Text><Text>{image.webformatWidth} X {image.webformatHeight}</Text>
                </Text>
                <TouchableHighlight style={styles.button} underlayColor='#cbd0ef' onPress={this.closeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
            <Toast ref="fav" fadeInDuration={500} fadeOutDuration={500} position='top'/>
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
    width: 300
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
    fontWeight: 'bold'
  },
  button: {
    height: 36,
    backgroundColor: '#6d80f1',
    borderColor: '#6d80f1',
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
  },
  icon: {
    width: 25,
    height:25,
    position: 'absolute'
  }
});