import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'

export class CustomInput extends Component {
  render() {
    const {value, placeholder, handleChangeText, otherStyles} = this.props

    return (
        <View className={`${otherStyles} px-4 border-b-2 focus:border-secondary items-center flex-row`}>
            <TextInput 
                className="flex-1 text-white font-psemibold text-base" 
                value={value} 
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
            />
        </View>
    )
  }
}

export default CustomInput