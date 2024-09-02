import { Text, View, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import SalesEntry from '../../components/SalesEntry';
import { useFocusEffect } from '@react-navigation/native';

const Sales = () => {
  const [allSales, setAllSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSales = async () => {
    console.log("fetchSales")
    setIsLoading(true);
    try {
      const response = await axios.get('http://192.168.100.4:3000/sales');
      setAllSales(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSales(); // Fetch data when the tab is focused
    }, [])
  );

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center"></View>
      <FlatList
        data={allSales}
        keyExtractor={(sale) => sale.clientPhoneNumber}
        renderItem={({ item }) => <SalesEntry sale={item} />}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      />
    </SafeAreaView>
  );
};

export default Sales;
