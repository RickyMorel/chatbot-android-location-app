import React from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import CustomButton from './CustomButton';
import Utils from '../app/Utils';
import { useRouter } from 'expo-router';

const OrderCardView = ({ currentOrder, isOpen, closeCallback }) => {
  const router = useRouter();

  const tableData = {
    tableHead: ['Nombre Item', 'Cantidad', 'Precio'],
    tableData: currentOrder?.order?.map(x => [
      x.name,
      x.amount,
      Utils.formatCurrency(x.price)
    ]),
  };

  const serializedData = encodeURIComponent(JSON.stringify(currentOrder));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={closeCallback}
    >
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
        <View className="bg-white rounded-lg p-6">
          <View className="flex-row items-center">
            <Text className="flex-1 text-lg">{currentOrder?.name}</Text>
            <Text className="text-right">Total: {Utils.formatCurrency(currentOrder?.totalSold)}</Text>
          </View>
          <Table className="w-[300px]">
            <Row data={tableData.tableHead} style={styles.head} textStyle={styles.headText} />
            <Rows data={tableData.tableData} textStyle={styles.text} />
          </Table>
          <View className="flex-row items-center justify-center mt-2">
            <View className='mr-4 h-[40px] w-[130px]'>
              <CustomButton 
                title="Hacer Venta" 
                handlePress={() => { router.push(`/create-sale?data=${serializedData}`); closeCallback(); }} 
              />
            </View>
            <View className='ml-4 h-[40px] w-[90px]'>
              <CustomButton title="Cerrar" handlePress={closeCallback} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, justifyContent: 'center' },
  head: { height: 44 },
  headText: { fontSize: 15, fontWeight: 'bold', textAlign: 'center', verticalAlign: 'top' },
  text: { margin: 6, fontSize: 13, textAlign: 'center', verticalAlign: 'top' },
});

export default OrderCardView;
