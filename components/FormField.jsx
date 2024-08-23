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
    const {title, value, placeholder, handleChangeText, otherStyles} = this.props

    return (
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
            <TextInput 
                className="flex-1 text-white font-psemibold text-base" 
                value={value} 
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !this.state?.showPassword}
            />

            {title === "Password" && (
                <TouchableOpacity onPress={() => this.setState({showPassword: !this.state.showPassword})}>
                    <Image source={!this.state.showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
                </TouchableOpacity>
            )}
        </View>
      </View>
    )
  }
}

export default FormField