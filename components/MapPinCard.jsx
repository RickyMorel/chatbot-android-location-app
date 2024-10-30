import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Text, View, TouchableWithoutFeedback, Linking } from 'react-native';
import CustomButton from './CustomButton';
import Colors from '../app/colors';
import SurePopup from './SurePopup';

const MapPinCard = ({ clientName, clientNumber, isOpen, closeCallback, allOrders, hasName }) => {
  const router = useRouter();
  const [cancelOrderPopupIsOpen, setCancelOrderPopupState] = useState(false);

  const openWhatsApp = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      alert('Asegurate que WhatsApp este instalado en tu dispositivo');
    });
  };

  const openConfirmCancelOrderPopup = (state) => {
    setCancelOrderPopupState(state ?? true)
  }

  const foundOrder = allOrders.find(x => x.phoneNumber == clientNumber)

  const serializedData = encodeURIComponent(JSON.stringify({phoneNumber: clientNumber, order: foundOrder?.order}));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
    >
      <SurePopup clientName={clientName ?? clientNumber} clientNumber={clientNumber} isOpen={cancelOrderPopupIsOpen} closeCallback={() => {closeCallback(); openConfirmCancelOrderPopup(false); }}/>
      <TouchableWithoutFeedback onPress={() => closeCallback('')}>
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
        <View className="bg-white rounded-lg p-3" style={{ maxHeight: '50%' }}>
          <View className="flex-row items-center">
            <Text className="flex-1 text-lg text-center">{clientName}</Text>
            {
              hasName == true ? 
              <View className='h-[35px] w-[35px] absolute right-0'>
                <CustomButton 
                  icon="remove-shopping-cart"
                  iconType={1}
                  handlePress={() => openConfirmCancelOrderPopup(true)} 
                  color={Colors.Red}
                />
              </View>
              :
              <></>
            }
          </View>
          <View className="flex-row items-center justify-center mt-2">
            <View className='mr-2 h-[40px] w-[150px]'>
              <CustomButton 
                title="Mensajear" 
                icon="whatsapp"
                iconType={4}
                handlePress={() => openWhatsApp(clientNumber)} 
              />
            </View>
            <View className='ml-2 h-[40px] w-[150px]'>
              <CustomButton icon="payment" iconType={1} title="Crear Venta" handlePress={() => { router.push(`/create-sale?data=${serializedData}`); closeCallback(); }}/>
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MapPinCard;
