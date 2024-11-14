import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CardsView from '../../components/CardsView';
import MapComponent from '../../components/MapComponent';
import globalVars from '../globalVars';
import Constants from 'expo-constants';
import Utils from '../Utils';
import EventBus from '../../components/EventEmitter';

const Map = () => {
  const [refreshing, setRefreshing] = useState(false);
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

  useEffect(() => { 
    EventBus.on('canceledOrder', handleCancelOrderEvent);

    // Cleanup the event listener when the component unmounts
    return () => {
      EventBus.off('canceledOrder', handleCancelOrderEvent);
    };
  }, [orders]);

  const handleCancelOrderEvent = (data) => {
    console.log("handleCancelOrderEvent", data.clientNumber, orders);
    let filteredOrders = orders.filter(x => x.phoneNumber != data.clientNumber)
    setOrders(filteredOrders);
  };

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
    try {
      const response = await axios.get(`${Utils.backendLink}/order/confirmed?movil=${globalVars.getUser().movil}`);

      setOrders(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
    }
  };

  const fetchStoreLocation = async () => {
    try {
      const url = `${Utils.backendLink}/client-location/getLocationByNumber?phoneNumber=STORE`;
      const response = await axios.get(url);
      setStoreLocation(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
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
