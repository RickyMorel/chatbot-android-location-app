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
    const {placeholder, handleChangeText, otherStyles, keyboardType, hasError = false} = this.props

    return (
        <View  style={formStyle(hasError)}>
            <TextInput 
                className="font-psemibold" 
                value={this.state.value} 
                placeholder={placeholder}
                placeholderTextColor= {hasError ? '#ef4444' : "#7b7b8b"}
                keyboardType={keyboardType ?? "default"}
                onChangeText={handleChangeText}
            />
        </View>
    )
  }
}

const formStyle = (hasError) => ({
  borderWidth: 2,
  borderRadius: 16, 
  borderColor: hasError ? '#ef4444' : '#ffffff',
  width: 45,
  height: 45,
  backgroundColor: '#f1f5f9', 
  alignItems: 'center',
  shadowColor: hasError ? '#FF0000' : '#000',
  shadowOffset: { width: 0, height: 4 }, 
  shadowOpacity: 0.3, 
  shadowRadius: 6, 
})

export default CustomInput