import { Text, View, FlatList } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import SalesEntry from '../../components/SalesEntry';
import { useFocusEffect } from '@react-navigation/native';
import GenericPopup from '../popups/GenericPopup';
import {EmptyState} from '../../components/EmptyState'
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';

const Sales = () => {
  const router = useRouter();

  const [allSales, setAllSales] = useState([]);
  const [saleToDelete, setSaleToDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(false);

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

  const openDeletePopup = (sale) => {
    popupRef.current.setModalVisible(true)

    setSaleToDelete(sale)
  }

  const handleDelete = async (sale) => {
    console.log("handleDelete")
    const response = await axios.post('http://192.168.100.4:3000/sales/delete', {clientPhoneNumber: sale.clientPhoneNumber, creationDate: sale.creationDate});

    let newSales = [...allSales]
    
    newSales = newSales.filter(x => x.clientPhoneNumber != sale.clientPhoneNumber)

    setAllSales(newSales)
  }

  useFocusEffect(
    useCallback(() => {
      fetchSales(); // Fetch data when the tab is focused
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GenericPopup title="Estas seguro que quieres eliminar esta venta?" ref={popupRef} confirmCallback={() => handleDelete(saleToDelete)}/>
      <View className="flex-row items-center justify-center"></View>
      <FlatList
        data={allSales}
        keyExtractor={(sale) => sale.clientPhoneNumber}
        renderItem={({ item }) => <SalesEntry sale={item} deleteCallback={openDeletePopup}/>}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        ListEmptyComponent={() => <EmptyState title="Hoy no se realizaron ventas" subtitle="Cuando realices una venta, aparecerá en esta pestaña"/>}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View className="w-[40px] h-[40px] mt-6 mr-2 absolute top-[25px] right-0">
        <CustomButton icon="add" handlePress={() => { router.push(`/create-sale`); }} />
      </View>
    </SafeAreaView>
  );
};

export default Sales;
