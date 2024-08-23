import { Text, View } from 'react-native'
import React, { Component } from 'react'
import MapComponent from '../../components/MapComponent'

export class Map extends Component {
  render() {
    return (
      <View>
        <MapComponent/>
      </View>
    )
  }
}

export default Map