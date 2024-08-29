import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'

export class SalesEntry extends Component {
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
            <Text className="text-gray-600 font-semibold ml-2">{`${Intl.NumberFormat('de-DE').format(sale.totalSold)}gs`}</Text>
      </View>
    )
  }
}

export default SalesEntry