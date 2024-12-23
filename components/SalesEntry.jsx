import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'
import Utils from '../app/Utils'
import CustomButton from './CustomButton';
import axios from 'axios';

export class SalesEntry extends Component {
  deleteSale = () => {
    const {sale} = this.props
    try {
      this.props.deleteCallback(sale)
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  render() {
    const {sale} = this.props

    const itemNames = sale.order.map(x => x.name)
    const namesJoined = itemNames.join(', ')

    return (
        <View className="flex-row items-center bg-white rounded-lg shadow-lg p-2 border border-gray-200">
            <View className="flex-1 ml-2">
                <Text className="text-black font-semibold">{sale.clientName}</Text>
                <View className="flex-row items-center mt-1">
                    <Text className="ml-1 text-gray-600">{namesJoined}</Text>
                </View>
            </View>
            <Text className="text-gray-600 font-semibold ml-2">{Utils.formatCurrency(sale?.totalSold)}</Text>
            <View className='h-[40px] w-[40px] mt-4 ml-2' resizeMode='contain'><CustomButton icon='delete' handlePress={this.deleteSale}/></View>
      </View>
    )
  }
}

export default SalesEntry