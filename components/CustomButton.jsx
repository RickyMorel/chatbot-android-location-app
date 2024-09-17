import { TouchableOpacity, Text, Image } from 'react-native'
import React, { Component } from 'react'
import IconElement from './IconElement';

export class CustomButton extends Component {
  render() {
    const {title, handlePress, containerStyles, textStyles, isLoading, icon, iconSize, iconType = 1} = this.props

    return (
      <TouchableOpacity 
        className={`w-full h-full bg-secondary rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        {title ? <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text> : <></>}
        {
          icon ? 
          <IconElement icon={icon} iconSize={iconSize} iconType={iconType}/>
          : 
          <></>
        }
      </TouchableOpacity>
    )
  }
}

export default CustomButton