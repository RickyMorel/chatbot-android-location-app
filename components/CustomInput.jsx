import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'

export class CustomInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  render() {
    const {placeholder, handleChangeText, otherStyles, keyboardType} = this.props

    return (
        <View className={`${otherStyles} border-b-2 focus:border-secondary items-center`}>
            <TextInput 
                className="flex-1 font-psemibold text-base text-center" 
                value={this.state.value} 
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                keyboardType={keyboardType ?? "default"}
                onChangeText={handleChangeText}
            />
        </View>
    )
  }
}

export default CustomInput