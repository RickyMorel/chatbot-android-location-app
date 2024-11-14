import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { icons } from '../constants'

export class FormField extends Component {
    constructor() {
        super()

        this.state = {
            showPassword: false
        }
    }
  render() {
    const {title, value, placeholder, handleChangeText, otherStyles, keyboardType, hasError = false} = this.props

    return (
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-600 font-pmedium">{title}</Text>

        <View
            style={formStyle(hasError)}
          >
            <TextInput 
                className="flex-1 text-black font-psemibold text-base" 
                keyboardType={keyboardType?? 'text'}
                value={value} 
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Contraseña" && !this.state?.showPassword}
            />

            {title === "Contraseña" && (
                <TouchableOpacity onPress={() => this.setState({showPassword: !this.state.showPassword})}>
                    <Image source={!this.state.showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
                </TouchableOpacity>
            )}
        </View>
      </View>
    )
  }
}

const formStyle = (hasError) => ({
  borderWidth: 2,
  borderRadius: 16, 
  borderColor: hasError ? '#ef4444' : '#ffffff',
  width: '100%',
  height: 64,
  paddingHorizontal: 16,
  backgroundColor: '#f1f5f9', 
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: hasError ? '#FF0000' : '#000',
  shadowOffset: { width: 0, height: 4 }, 
  shadowOpacity: 0.3, 
  shadowRadius: 6, 
})

export default FormField