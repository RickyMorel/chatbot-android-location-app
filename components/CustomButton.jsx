import { TouchableOpacity, Text, Image } from 'react-native'
import React, { Component } from 'react'

export class CustomButton extends Component {
  render() {
    const {title, handlePress, containerStyles, textStyles, isLoading, icon} = this.props

    return (
      <TouchableOpacity 
        className={`bg-secondary rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        {title ? <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text> : <></>}
        {icon ? <Image source={icon} style={{height: '70%', width: '70%'}} resizeMode='contain'/> : <></>}
      </TouchableOpacity>
    )
  }
}

export default CustomButton