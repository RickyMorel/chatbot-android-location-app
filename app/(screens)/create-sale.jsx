import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import CreateSaleItem from '../../components/CreateSaleItem';
import { icons } from '../../constants';

const CreateSale = () => {
  const [sale, setSale] = useState(undefined);
  const [itemImages, setItemImages] = useState([]);
  const { data } = useLocalSearchParams();

  useEffect(() => {
    const dataObj = JSON.parse(data);

    const saleData = {
      clientName: dataObj.name,
      clientPhoneNumber: dataObj.phoneNumber,
      order: dataObj.order?.map(x => ({name: x.name, code: x.code, price: x.price, amount: x.amount})),
      salesPerson: "Juan Pancho",
      movil: "Movil002",
      totalSold: dataObj.totalSold
    }

    setSale(saleData)
  }, [data]);

  useEffect(() => {
    if(!sale) {return;}
    
    fetchProductImages(sale.order)
  }, [sale]);

  fetchProductImages = async (allProducts) => {
   try {
      const response = await axios.put(`http://192.168.100.4:3000/inventory/getItemsByCode`, allProducts.map(x => x.code));
      setItemImages(response.data)
    } catch (error) {console.log('Error:', error.message);} 
  }

  const createSale = async () => {
    try {
      const response = await axios.post('http://192.168.100.4:3000/sales/createSale', saleData);
      console.log('Sale created successfully:', response.data);
      // Navigate or handle success
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const addItem = () => {
    let newSale = {...sale}

    newSale.order.push({...sale.order[0]})

    setSale(newSale)
  }

  const removeItem = (itemCode) => {
    let newSale = {...sale}

    newSale.order = newSale.order.filter(x => x.code != itemCode)

    setSale(newSale)
  }

  return (
    <SafeAreaView>
    <View className="h-full w-full">
      <Text className='text-center'>{sale?.clientName}</Text>
      <FlatList
        style={styles.flatList}
        data={sale?.order}
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (
            <CreateSaleItem item={item} image={itemImages?.find(x => x.code == item.code)?.imageLink} removeItemCallback={removeItem}/>
        )}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
      />
      <View className="w-full h-[80px]"><CustomButton icon={icons.eyeHide} handlePress={addItem}/></View>
      <View className="bottom-0 left-0 right-0 absolute"><CustomButton title="Confirmar Venta" handlePress={createSale}/></View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
  }
});

export default CreateSale;
