import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import CreateSaleItem from '../../components/CreateSaleItem';
import { icons } from '../../constants';

const CreateSale = () => {
  const [sale, setSale] = useState(undefined);
  const [itemImages, setItemImages] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { data } = useLocalSearchParams();

  useEffect(() => {
    const dataObj = JSON.parse(data);

    const saleData = {
      clientName: dataObj.name,
      clientPhoneNumber: dataObj.phoneNumber,
      order: dataObj.order?.map(x => ({name: x.name, code: x.code, price: x.price, amount: x.amount})),
      salesPerson: "Juan Pancho",
      movil: "Movil002",
      totalSold: dataObj.totalSold,
      creationDate: dataObj.creationDate
    }

    setSale(saleData)
  }, [data]);

  useEffect(() => {
    if(!sale) {return;}
    
    fetchAllItems()
  }, [sale]);

  fetchAllItems = async () => {
    try {
       const response = await axios.get(`http://192.168.100.4:3000/inventory/allItemsMobile`);
       setAllItems(response.data)
       setItemImages(response.data.map(x => ({code: x.code, imageLink: x.imageLink})))
     } catch (error) {console.log('Error:', error.message);} 
   }

  const createSale = async () => {
    console.log("createSale", sale)
    try {
      const response = await axios.post('http://192.168.100.4:3000/sales/createSale', sale);
      console.log('Sale created successfully:', response.data);
      router.back()
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const enterEditMode = (forceTrue = false) => {
    if(forceTrue == true) { setIsInEditMode(true); return; }

    setIsInEditMode(!isInEditMode)
  }

  const addItem = () => {
    let newSale = {...sale}

    //Adds item that isn't already in list
    let itemToAdd = allItems.find(x => sale.order.find(y => y.code == x.code) == undefined)

    newSale.order.push({...itemToAdd})

    setSale(newSale)

    enterEditMode(true)
  }

  const updateItem = (item, prevItemCode) => {
    let newSale = {...sale}

    let newOrders = newSale.order.filter(x => x.code != prevItemCode)

    newOrders.push(item)

    newSale.order = [...newOrders]

    console.log("newSale", newSale)

    setSale(newSale)
  }

  const removeItem = (itemCode) => {
    let newSale = {...sale}

    newSale.order = newSale.order.filter(x => x.code != itemCode)

    setSale(newSale)
  }

  const flatListData = sale?.order ? [...sale?.order, {isAddButton: true}] : [{isAddButton: true}]

  return (
    <SafeAreaView>
    <View className="h-full w-full">
      <Text className='text-center'>Hacer Venta</Text>
      <FlatList
        style={styles.flatList}
        data={flatListData}
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (
            <CreateSaleItem allItems={allItems} item={item} updateItemCallback={updateItem} removeItemCallback={removeItem} addItemCallback={addItem} isInEditMode={isInEditMode}/>
        )}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
      />
      <View className="w-full h-[150px] bottom-0 right-0 left-0 bg-primary p-2">
        <View className='flex-row justify-between pb-4'>
          <View>
            <Text className='text-center font-bold pb-2'>{sale?.clientName}</Text>
            <Text className='text-center'>Total: {sale?.order?.reduce((acc, item) => acc + (+item.price * +item.amount), 0)}gs</Text>
          </View>
          <View className="w-[60px] h-[60px]"><CustomButton icon={isInEditMode ? icons.bookmark : icons.eyeHide} handlePress={enterEditMode}/></View>
        </View>
        <View><CustomButton title="Confirmar Venta" handlePress={createSale}/></View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
  }
});

export default CreateSale;
