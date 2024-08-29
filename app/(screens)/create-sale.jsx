import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

const CreateSale = () => {
  const { data } = useLocalSearchParams();

  const dataObj = JSON.parse(data);

  const saleData = {
    clientName: dataObj.name,
    clientPhoneNumber: dataObj.phoneNumber,
    order: dataObj.order?.map(x => ({name: x.name, code: x.code, price: x.price, amount: x.amount})),
    salesPerson: "Juan Pancho",
    movil: "Movil002",
    totalSold: dataObj.totalSold
  }

  console.log("saleData", saleData)

  const createSale = async () => {
    try {
      const response = await axios.post('http://192.168.100.4:3000/sales/createSale', saleData);
      console.log('Sale created successfully:', response.data);
      // Navigate or handle success
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Item: {saleData.item}</Text>
      <Text>Price: ${saleData.price}</Text>
      <Text>Quantity: {saleData.quantity}</Text>
      <CustomButton title="Submit Sale" handlePress={createSale} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, justifyContent: 'center' },
});

export default CreateSale;
