import { TouchableOpacity, Text } from 'react-native'
import React, { Component } from 'react'

export class CustomButton extends Component {
  render() {
    const {title, handlePress, containerStyles, textStyles, isLoading} = this.props

    return (
      <TouchableOpacity 
        className={`bg-secondary rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default CustomButton