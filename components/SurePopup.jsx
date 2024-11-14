import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, View, TouchableWithoutFeedback, Linking } from 'react-native';
import CustomButton from './CustomButton';
import Colors from '../app/colors';
import Utils from '../app/Utils';
import axios from 'axios';
import EventBus from './EventEmitter';

const SurePopup = ({ clientName, clientNumber, isOpen, closeCallback }) => {
  const router = useRouter();

  cancelOrder = async () => {
   try {
      const response = await axios.put(`${Utils.backendLink}/order/cancelOrder`, {clientNumber: clientNumber});
      EventBus.emit('canceledOrder', { clientNumber: clientNumber });
      closeCallback()
    } catch (error) {console.log('Error:', error.message);} 
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
    >
      <TouchableWithoutFeedback onPress={() => closeCallback(false)}>
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
        <View className="bg-white rounded-lg p-3" style={{ maxHeight: '50%' }}>
          <View className="flex-row items-center">
            <Text className="flex-1 text-lg text-center">Eliminar pedido de {clientName}?</Text>
          </View>
          <View className="flex-row items-center justify-center mt-2">
            <View className='mr-2 h-[40px] w-[120px]'>
                <CustomButton title="Volver" handlePress={() => { closeCallback(false); }}/>
            </View>
            <View className='ml-2 h-[40px] w-[190px]'>
                <CustomButton 
                title="Eliminar Pedido" 
                color={Colors.Red}
                handlePress={() => cancelOrder()} 
              />
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SurePopup;
