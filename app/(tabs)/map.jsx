import axios from 'axios';
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import CardsView from '../../components/CardsView';
import MapComponent from '../../components/MapComponent';
import * as Location from 'expo-location';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      isLoading: false,
      orders: [],
      userLocation: null,
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
    this.fetchOrderData();
    this.fetchStoreLocation()
  }

  requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      });
    } catch (error) {
      console.log('Error getting location:', error.message);
    }
  };

  fetchOrderData = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const url = `http://192.168.100.4:3000/order/confirmed`;
      const response = await axios.get(url);
      this.setState({
        orders: response.data,
      });
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  fetchStoreLocation = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const url = `http://192.168.100.4:3000/client-location/getLocationByNumber?phoneNumber=STORE`;
      const response = await axios.get(url);
      this.setState({
        storeLocation: response.data,
      });
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { orders, userLocation } = this.state;
    const locations = orders?.map(x => ({
      name: x.name,
      totalSold: x.totalSold,
      locationDto: x.locationDto,
    }));

    return (
      <View>
        <View className="w-full h-full">
          <MapComponent orderLocations={locations ?? []} storeLocation={this.state.storeLocation} userLocation={userLocation}/>
        </View>
        <View className="w-full h-[100px] absolute bottom-0 bg-primary">
          <CardsView posts={this.state?.orders ?? []}/>
        </View>
      </View>
    );
  }
}

export default Map;
