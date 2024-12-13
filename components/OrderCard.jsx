import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import CustomButton from './CustomButton'
import * as Animatable from 'react-native-animatable'
import Utils from '../app/Utils'
import Colors from '../app/colors'

export class OrderCard extends Component {
  render() {
    const {item, activeItem, viewOrderCallback} = this.props

    let amount = 0
    item.order.forEach(product => {
        amount += +product.amount
    });

    return (
        <Animatable.View className="mr-1" animation={activeItem == item.phoneNumber ? zoomIn : zoomOut} duration={500}>
            <View className='flex-row bg-primary rounded-lg m-1 shadow-md h-[80px] w-[230px]'>
                <View className='w-2' style={{backgroundColor: Colors.Secondary}} />      
                <View className='flex-1 pl-4 mt-3'>
                    <Text className='text-black font-bold'>{Utils.getCutName(item.name)}</Text>
                    <Text className='text-gray-600'>{amount} productos. Valor: {Utils.formatCurrency(item.totalSold)}</Text>
                </View>
                <View className="w-[50px] h-[30px] mt-6 mr-2">
                    <CustomButton title="Ver" handlePress={() => {viewOrderCallback(item)}}/>
                </View>
            </View>
        </Animatable.View>
    )
  }
}

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

export default OrderCard