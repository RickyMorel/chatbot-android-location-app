import { FlatList, ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import OrderCard from './OrderCard'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({activeItem, item}) => {
  console.log("activeItem", activeItem)
  console.log("item", item)
  return (
    <Animatable.View className="mr-5" animation={activeItem == item.id ? zoomIn : zoomOut} duration={500}>
      <TouchableOpacity activeOpacity={0.7} className="relative justify-center items-center">
        <ImageBackground source={{uri: item.thumbnail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40" resizeMode='cover'/>
        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain'/>
      </TouchableOpacity>
    </Animatable.View>
  )
}

export class CardsView extends Component {
  constructor() {
    super()

    this.state = {
      activeItem: undefined
    }
  }

  componentDidMount() {
    this.setState({
      activeItem: this.props.posts[0]
    })
  }

  onViewableItemsChanged = ({viewableItems}) => {
    if(viewableItems.length > 0) {
      this.setState({
        activeItem: viewableItems[0].key
      })
    }
  }

  render() {
    const {posts} = this.props

    console.log("posts", posts)

    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <OrderCard activeItem={this.state.activeItem} item={item}/>
        )}
        horizontal
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170}}
      />
    )
  }
}

export default CardsView