import React, { Component } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';

class GenericPopup extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
    const { title, confirmCallback } = this.props;

    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => this.setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{title}</Text>
          <View className="flex-row justify-between items-center">
            <View className='pr-2 w-[50px] h-[40px]'><CustomButton title="Si" handlePress={() => { confirmCallback(); this.setModalVisible(false); }} /></View>
            <View className="pl-2 w-[80px] h-[40px]"><CustomButton title="Cerrar" handlePress={() => this.setModalVisible(false)} /></View>
          </View>
        </View>
      </View>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default GenericPopup;
