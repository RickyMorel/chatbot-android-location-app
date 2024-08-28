import React, { Component } from 'react';
import { Modal, Text, Pressable, View, FlatList } from 'react-native';

class OrderCardView extends Component {
  render() {
    const { currentOrder, isOpen, closeCallback } = this.props;

    const cardViewItems = currentOrder?.order?.map((item, index) => (
        // <View className="border-b border-gray-200">
          <View className="flex flex-row justify-between px-4 py-2">
            <Text className="text-gray-600 mr-3">{item.name}</Text>
            <Text className="text-gray-600 mr-3">{item.amount}</Text>
            <Text className="text-gray-600 mr-3">{Intl.NumberFormat('de-DE').format(item.price)}gs</Text>
          </View>
        // </View>
        // <View key={index} className="mb-2 flex-row">
        //   <Text className="text-black font-semibold">{item.name}</Text>
        //   <Text className="text-gray-600">{item.amount}</Text>
        //   <Text className="text-gray-600">{Intl.NumberFormat('de-DE').format(item.price)}gs</Text>
        // </View>
    ))

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
            <View className="border-b border-gray-200">
                <View className="flex flex-row justify-between px-4 py-2">
                    <Text className="text-black font-semibold mr-3">Nombre Item</Text>
                    <Text className="text-black font-semibold mr-3">Cantidad</Text>
                    <Text className="text-black font-semibold mr-3">Precio</Text>
                </View>
                {cardViewItems}
            </View>
            <Text>Total: {currentOrder?.totalSold}</Text>
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
