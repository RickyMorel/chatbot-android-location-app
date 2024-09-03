import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import Utils from '../app/Utils'
import { icons } from '../constants'
import CustomButton from './CustomButton'
import CustomDropdown from './CustomDropdown'
import CustomInput from './CustomInput'

export class CreateSaleItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: props.item
        }
    }

    handleSelect = (itemCode) => {
        const prevItemCode = this.state.item.code

        let wantedItem =  this.props.allItems.find(x => x.code == itemCode)

        this.setState({
            item: wantedItem
        })

        this.props.updateItemCallback(wantedItem, prevItemCode)
    }

    handleChangeAmount = (newAmount) => {
        const prevItemCode = this.state.item.code

        let newItem =  {...this.state.item}
        newItem.amount = newAmount

        this.setState({
            item: newItem
        })

        this.props.updateItemCallback(newItem, prevItemCode)
    }

  render() {
    const {removeItemCallback, allItems, addItemCallback, isInEditMode} = this.props
    const {item} = this.state

    let maxCharacterLength = 18
    let itemName = item.name

    if(itemName?.length > maxCharacterLength) {
        itemName = itemName.slice(0, 18) + "..."
    }

    return (
        item.isAddButton ? (
            <View className="w-full h-[70px] p-2"><CustomButton icon="add" handlePress={addItemCallback} iconSize={36}/></View>
        ) :
        (
            <View className="flex-row bg-white rounded-lg shadow-lg p-2 border border-gray-200 items-center justify-between">
                <Image
                    source={{ uri: allItems?.find(x => x.code == item.code)?.imageLink }}
                    className="h-[50px] w-[50px] rounded-lg" // No margin needed for equal spacing
                />
                {
                    isInEditMode ? 
                        <CustomDropdown data={allItems.map(x => ({label: x.name, value: x.code}))} value={item.code} handleSelect={this.handleSelect}/>
                    :
                        <Text className="text-left text-black font-semibold truncate">{itemName}</Text>
                }
                {
                    isInEditMode ? 
                        <CustomInput placeholder="Cantidad" keyboardType="numeric" value={item.amount} otherStyles="h-[25px] w-[25px]" handleChangeText={this.handleChangeAmount}/>
                    :
                        <Text className="text-gray-600 text-center">{item.amount}</Text>
                }
                <Text className="text-gray-600 font-semibold text-center">{Utils.formatCurrency(item.price)}</Text>
                <View className="w-[40px] h-[40px]" resizeMethod='contain'>
                    <CustomButton icon="delete" handlePress={() => removeItemCallback(item.code)} />
                </View>
            </View>
        )
    )
  }
}

export default CreateSaleItem