import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'
import Utils from '../app/Utils'
import CustomButton from './CustomButton';
import axios from 'axios';

export class SalesEntry extends Component {
  deleteSale = async () => {
    const {sale} = this.props
    console.log("sale", sale)
    try {
      const response = await axios.post('http://192.168.100.4:3000/sales/delete', {clientPhoneNumber: sale.clientPhoneNumber, creationDate: sale.creationDate});
      console.log('Sale created successfully:', response.data);
      router.back()
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
            <View className='h-[40px] w-[40px]'  resizeMode='contain'><CustomButton icon={icons.play} handlePress={this.deleteSale}/></View>
      </View>
    )
  }
}

export default SalesEntry