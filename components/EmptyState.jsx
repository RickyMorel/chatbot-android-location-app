import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

export class EmptyState extends Component {
  render() {
    const {title, subtitle} = this.props

    return (
      <View className="justify-center items-center px-4 h-full w-full">
        <Image source={images.empty} className="w-[270px] h-[250px]" resizeMode='contain'/>
        <Text className="text-xl text-center font-psemibold mt-2 mb-2">{title}</Text>
        <Text className="font-pmedium text-sm text-gray-900 text-center mb-4">{subtitle}</Text>
        <CustomButton title="Volver" handlePress={() => router.push('/map')} containerStyles="w-full h-[60px]"/>
      </View>
    )
  }
}

export default EmptyState