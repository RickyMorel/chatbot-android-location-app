import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import CustomButton from './CustomButton'

export class OrderCard extends Component {
  render() {
    const {item} = this.props
    const title = "Tu Vecina"
    const value = 10000

    let amount = 0
    item.order.forEach(product => {
        amount += +product.amount
    });

    return (
        <View className='flex-row bg-white rounded-lg m-4 shadow-md h-[80px] w-[230px]'>
            <View className='bg-red-600 w-2' />      
            <View className='flex-1 pl-4 mt-3'>
                <Text className='text-black font-bold'>{item.name}</Text>
                <Text className='text-gray-600'>{amount} productos. Valor: {Intl.NumberFormat('de-DE').format(item.totalSold)}gs</Text>
            </View>
            <View className="w-[50px] h-[30px] mt-6 mr-2">
                <CustomButton title="Ver"/>
            </View>
        </View>
    )
  }
}

export default OrderCard