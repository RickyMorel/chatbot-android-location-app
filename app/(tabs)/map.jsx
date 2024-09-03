import axios from 'axios';
import * as Location from 'expo-location';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import CardsView from '../../components/CardsView';
import MapComponent from '../../components/MapComponent';
import { useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const Map = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewTodaysClientLocations, setViewTodaysClientLocations] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [storeLocation, setStoreLocation] = useState(null);
  const [todaysClientLocations, setTodaysClientLocations] = useState([]);

  useFocusEffect(
    useCallback(() => {
      requestLocationPermission();
      fetchOrderData();
      fetchStoreLocation();
    }, [])
  );

  useEffect(() => {
    if(viewTodaysClientLocations == false) {return;}

    fetchAllTodaysClientsLocations();
  }, [viewTodaysClientLocations])

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
      const url = `http://192.168.100.4:3000/order/confirmed`;
      const response = await axios.get(url);
      console.log("response.data", response.data);
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
      const url = `http://192.168.100.4:3000/client-location/getLocationByNumber?phoneNumber=STORE`;
      const response = await axios.get(url);
      setStoreLocation(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllTodaysClientsLocations = async () => {
    setIsLoading(true);
    try {
      const url = `http://192.168.100.4:3000/client-location/getAllTodaysClientLocations`;
      const response = await axios.get(url);
      setTodaysClientLocations(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const locations = orders?.map(x => ({
    name: x.name,
    totalSold: x.totalSold,
    locationDto: x.locationDto,
  }));

  console.log("locations", locations.length)

  return (
    <View>
      <View className="w-full h-full">
        <MapComponent orderLocations={locations ?? []} storeLocation={storeLocation} userLocation={userLocation}/>
      </View>
      <View className="w-full h-[100px] absolute bottom-0 bg-primary">
        <CardsView posts={orders ?? []} />
      </View>
    </View>
  );
};

export default Map;
