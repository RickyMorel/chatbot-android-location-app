import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'

export class OrderCard extends Component {
  render() {
    return (
        <View className='bg-white shadow-md rounded-lg p-4 m-4'>
            <Image
            source={{ uri: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg" }}
            className='w-full h-40 rounded-lg mb-4'
            />
            <Text className='text-lg font-bold mb-2'>Mad card</Text>
            <Text className='text-gray-600'>Best description ever</Text>
        </View>
    )
  }
}

export default OrderCard