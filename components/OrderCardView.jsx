import React, { Component } from 'react';
import { Modal, Text, Pressable, View, FlatList } from 'react-native';

class OrderCardView extends Component {
  render() {
    const { currentOrder, isOpen, closeCallback } = this.props;

    console.log("currentOrder", currentOrder)

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={closeCallback}
      >
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
          <View className="bg-white rounded-lg p-6">
            <Text className="text-center text-lg">
              {currentOrder?.name}
            </Text>
            <View>
            {currentOrder?.order?.map((item, index) => (
                <View key={index} className="mb-2">
                  <Text className="text-black font-semibold">{item.name}</Text>
                  <Text className="text-gray-600">Cantidad: {item.amount}</Text>
                  <Text className="text-gray-600">Precio: {Intl.NumberFormat('de-DE').format(item.price)}gs</Text>
                </View>
              ))}
            </View>
            <Pressable
              className="bg-red-500 rounded-full p-3 mt-4"
              onPress={closeCallback}
            >
              <Text className="text-white font-bold text-center">
                Hide Modal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
}

export default OrderCardView;
