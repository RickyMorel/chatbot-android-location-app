import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'
import Utils from '../app/Utils'

export class StockEntry extends Component {
  render() {
    const {item, image} = this.props

    return (
        <View className="flex-row items-center bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <Image
          source={{ uri: image }} // Replace with the actual image URL
          className="h-[50px] w-[50px] rounded-lg"
        />
        <View className="flex-1 ml-2">
          <Text className="text-black font-semibold">{item.name}</Text>
          <View className="flex-row items-center mt-1">
            <Image source={icons.plus} tintColor="#F0B72A" className="w-6 h-6" resizeMode='contain' />
            <Text className="ml-1 text-gray-600">0</Text>
            <Image source={icons.plus} tintColor="#F0B72A" className="w-6 h-6" resizeMode='contain' />
            <Text className="ml-1 text-gray-600">{item.amount}</Text>
          </View>
        </View>
        <Text className="text-gray-600 font-semibold ml-2">{Utils.formatCurrency(item.price)}</Text>
      </View>
    )
  }
}

export default StockEntry