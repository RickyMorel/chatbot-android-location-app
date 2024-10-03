import { TouchableOpacity, Text, Image } from 'react-native'
import React, { Component } from 'react'
import IconElement from './IconElement';
import Colors from '../app/colors';

export class CustomButton extends Component {
  render() {
    const {title, handlePress, containerStyles, textStyles, isLoading, icon, iconSize, iconType = 1} = this.props

    return (
      <TouchableOpacity 
        className={`w-full h-full rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} 
        style={style(false)}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        {
          icon ? 
          <IconElement icon={icon} iconSize={iconSize} iconType={iconType}/>
          : 
          <></>
        }
        {title ? <Text className={`text-primary font-psemibold text-lg ${textStyles} ${icon ? 'ml-1' : ''}`}>{title}</Text> : <></>}
      </TouchableOpacity>
    )
  }
}

const style = (hasError) => ({
  borderWidth: 2,
  borderRadius: 16, 
  borderColor: hasError ? '#ef4444' : '#ffffff',
  backgroundColor: Colors.Secondary, 
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: hasError ? '#FF0000' : '#000',
  shadowOffset: { width: 0, height: 4 }, 
  shadowOpacity: 0.3, 
  shadowRadius: 6, 
})

export default CustomButton