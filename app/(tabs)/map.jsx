import { Text, View, FlatList, RefreshControl, Image } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapComponent from '../../components/MapComponent'
import { images } from '../../constants'
import CardsView from '../../components/CardsView'
import EmptyState from '../../components/EmptyState'
import { isLoading } from 'expo-font'
import axios from 'axios';

export class Map extends Component {
  constructor() {
    super()
    this.state = {
      refreshing: false,
      isLoading: false,
      orders: [],
    }
  }

  componentDidMount() {
    this.fetchOrderData()
    // this.setState({
    //   orders: [1, 2, 3, 4, 5, 6]
    // })
  }

  fetchOrderData = async () => {
    console.log("fetchOrderData")
    this.setState({
      isLoading: true
    })

   try {
      const url = `http://192.168.100.4:3000/order/confirmed`
      //const response = await axios.get(`${process.env.EXPO_PUBLIC_REACT_APP_HOST_URL}/order/confirmed`);
      const response = await axios.get(url);
      this.setState({
        orders: response.data
      })
    } catch (error) {console.log('Error:', error.message);} 
    finally {
      this.setState({
        isLoading: false
      })
    }
  };

  render() {
    const locations = this.state?.orders?.map(x => ({ name: x.name, totalSold: x.totalSold, locationDto: x.locationDto}))

    return (
      <View>
        <View className="w-full h-full">
          <MapComponent orderLocations={locations ?? []}/>
        </View>
        <View className="w-full h-[100px] absolute bottom-0 bg-primary">
          <CardsView posts={this.state?.orders ?? []}/>
        </View>
      </View>
    )
  }
}

export default Map