import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import React, { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CardsView from '../../components/CardsView';
import MapComponent from '../../components/MapComponent';
import globalVars from '../globalVars';
import Constants from 'expo-constants';

const Map = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [storeLocation, setStoreLocation] = useState(null);

  useFocusEffect(
    useCallback(() => {
      requestLocationPermission();
      fetchOrderData();
      fetchStoreLocation();
    }, [])
  );

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.log('Error getting location:', error.message);
    }
  };

  const fetchOrderData = async () => {
    setIsLoading(true);
    try {
      console.log("Constants", Constants)
      const response = await axios.get(`${Constants.expoConfig.extra.apiUrl}/order/confirmed?movil=${globalVars.getUser().movil}`);

      console.log("fetchOrderData", response.data)

      setOrders(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStoreLocation = async () => {
    setIsLoading(true);
    try {
      const url = `${Constants.expoConfig.extra.apiUrl}/client-location/getLocationByNumber?phoneNumber=STORE`;
      const response = await axios.get(url);
      setStoreLocation(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const locations = orders?.map(x => ({
    name: x.name,
    totalSold: x.totalSold,
    locationDto: x.locationDto,
  }));

  return (
    <View>
      <View className="w-full h-full">
        <MapComponent orderLocations={locations ?? []} storeLocation={storeLocation} userLocation={userLocation} allOrders={orders}/>
      </View>
      {
        locations?.length > 0 ?
        <View className="w-full h-[90px] absolute bottom-0 bg-primary justify-center">
          <CardsView posts={orders ?? []} />
        </View>
        :
        <></>
        // <View className='h-[60px] w-full absolute bottom-8 rounded-xl bg-white border-black-100 justify-center ml-4 mr-4'>
        //   <Text className='text-center'>No hay pedidos cargados</Text>
        // </View>
      }
    </View>
  );
};

export default Map;
