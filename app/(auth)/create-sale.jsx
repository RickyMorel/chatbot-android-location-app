import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateSaleItem from '../../components/CreateSaleItem';
import CustomButton from '../../components/CustomButton';
import Utils from '../Utils';
import globalVars from '../globalVars';

const CreateSale = () => {
  const [sale, setSale] = useState(undefined);
  const [itemImages, setItemImages] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { data } = useLocalSearchParams();

  useEffect(() => {
    setSaleDataAsync()
  }, [data]);

  useEffect(() => {
    if(!sale) {return;}
    
    fetchAllItems()
  }, [sale]);

  const setSaleDataAsync = async () => {
    const dataObj = data ? JSON.parse(data) : undefined;
    
    console.log("setSaleDataAsync", dataObj)

    let clientName = dataObj?.name?.trim()

    if(!clientName || clientName.length < 1) { 
      const response = await fetchClientByNumber(dataObj?.phoneNumber)
      console.log("response data", response)
      clientName = response.name.trim();
    }

    console.log("clientName", clientName)

    const saleData = {
      clientName: clientName,
      clientPhoneNumber: dataObj?.phoneNumber ?? "",
      order: dataObj?.order?.map(x => ({name: x.name, code: x.code, price: x.price, amount: x.amount})) ?? [],
      salesPerson: globalVars.getUser().name,
      movil: globalVars.getUser().movil,
      totalSold: dataObj?.totalSold ?? 0,
      creationDate: dataObj?.creationDate ?? new Date(),
    }

    setSale(saleData)
  }

  fetchAllItems = async () => {
    try {
       const response = await axios.get(`http://192.168.100.4:3000/inventory/allItemsMobile`);
       setAllItems(response.data)
       setItemImages(response.data.map(x => ({code: x.code, imageLink: x.imageLink})))
     } catch (error) {console.log('Error:', error.message);} 
  }

  fetchClientByNumber = async (phoneNumber) => {
    try {
      const response = await axios.get(`http://192.168.100.4:3000/client-crud/getClientByPhoneNumber?phoneNumber=${phoneNumber}`);
      console.log("fetchClientByNumber", phoneNumber, response.data)
      return response.data
    } catch (error) {}
  };

  const createSale = async () => {
    if(hasErrors() == true) {return;}

    try {
      const response = await axios.post('http://192.168.100.4:3000/sales/createSale', sale);
      console.log('Sale created successfully:', response.data);
      router.back()
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const hasErrors = () => {
    let errors = []

    if(sale.order.length < 1) { errors.push("empty order")}

    for(const item of sale.order) {
      if(!item.amount || item.amount == 0) {
        errors.push("amount")
      }
    }

    setErrors(errors)

    if(errors.length > 0) {return true;}

    return false
  }

  const getErrorMessages = () => {
    let errorMessages = ""

    if(errors.includes("amount")) {errorMessages += "*Algunos items no tienen cantidad"}
    if(errors.includes("empty order")) {errorMessages += "*No se puede hacer una venta sin items"}

    return errorMessages.trimEnd("\n")
  }

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
      <Text className='text-center font-bold'>Hacer Venta</Text>
      <FlatList
        style={styles.flatList}
        data={flatListData}
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (
            <CreateSaleItem errors={errors} allItems={allItems} item={item} updateItemCallback={updateItem} removeItemCallback={removeItem} addItemCallback={addItem} isInEditMode={isInEditMode}/>
        )}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
      />
      <View className="w-full h-[150px] bottom-0 right-0 left-0 bg-primary p-2">
        <View className='flex-row justify-between pb-1'>
          <View>
            <Text className='text-center font-bold pb-2'>{sale?.clientName}</Text>
            <Text className='text-left'>Total: {Utils.formatCurrency(sale?.order?.reduce((acc, item) => acc + (+item.price * +item.amount), 0))}</Text>
          </View>
          <View className="w-[40px] h-[40px]"><CustomButton icon={isInEditMode ? "visibility" : "edit"} handlePress={enterEditMode}/></View>
        </View>
        {errors.length > 0 ? <Text className=" text-sm text-red-600 font-pregular mb-1">{getErrorMessages()}</Text> : <></>} 
        <View className='h-[60px] mt-1'><CustomButton hasError={errors.length > 0} title="Confirmar Venta" handlePress={createSale}/></View>
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
