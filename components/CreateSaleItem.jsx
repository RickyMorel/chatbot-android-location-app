import { Text, View, Image, Picker } from 'react-native'
import React, { Component } from 'react'
import CustomButton from './CustomButton'
import {icons} from '../constants'
import FormField from './FormField'
import CustomInput from './CustomInput'

export class CreateSaleItem extends Component {
  render() {
    const {image, item, removeItemCallback} = this.props

    return (
        <View className="flex-row bg-white rounded-lg shadow-lg p-2 border border-gray-200 items-center justify-between">
            <Image
                source={{ uri: image }}
                className="h-[50px] w-[50px] rounded-lg" // No margin needed for equal spacing
            />
                {/* <Text className="text-black font-semibold text-center truncate">{item.name}</Text> */}
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Python" value="python" />
                </Picker>
                <Text className="text-gray-600 text-center">{item.amount}</Text>
                {/* <CustomInput placeholder="Ingresar Cantidad" value={item.amount} otherStyles="h-[25px] w-[10px]"/> */}
                <Text className="text-gray-600 font-semibold text-center">{`${Intl.NumberFormat('de-DE').format(item.price)} gs`}</Text>
            <View className="w-[50px] h-[50px]" resizeMethod='contain'>
                <CustomButton icon={icons.bookmark} handlePress={() => removeItemCallback(item.code)} />
            </View>
        </View>
    )
  }
}

export default CreateSaleItem