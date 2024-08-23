import { FlatList, Text, View } from 'react-native'
import React, { Component } from 'react'

export class Trending extends Component {
  render() {
    const {posts} = this.props

    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <Text className="text-3xl text-white">{item.id}</Text>
        )}
        horizontal
      />
    )
  }
}

export default Trending