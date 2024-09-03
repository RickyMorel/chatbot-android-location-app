import React from 'react';
import { Modal, Text, Pressable, View, StyleSheet , FlatList} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import CustomButton from './CustomButton';
import Utils from '../app/Utils';
import { useRouter } from 'expo-router';
import CreateSaleItem from './CreateSaleItem';

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

  const OrderCardViewItem = (newItem) => {
    const item = newItem.item
    const itemName = Utils.getCutName(item.name, 12)

    console.log("itemmmm", item)

    return (
      <View className="flex-row bg-white rounded-lg shadow-lg p-2 border border-gray-200 items-center justify-between">
        {/* <Image
            source={{ uri: allItems?.find(x => x.code == item.code)?.imageLink }}
            className="h-[50px] w-[50px] rounded-lg" // No margin needed for equal spacing
        /> */}
        <Text className="text-left text-black font-semibold truncate">{itemName}</Text>
        <Text className="text-gray-600 text-center">{item.amount}</Text>
        <Text className="text-gray-600 font-semibold text-center">{Utils.formatCurrency(item.price)}</Text>
      </View>
    )
  }

  return (
<Modal
  animationType="fade"
  transparent={true}
  visible={isOpen}
  onRequestClose={closeCallback}
>
  <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
    <View className="bg-white rounded-lg p-3" style={{ maxHeight: '50%' }}>
      <View className="flex-row items-center">
        <Text className="flex-1 text-lg">{currentOrder?.name}</Text>
        <Text className="text-right">Total: {Utils.formatCurrency(currentOrder?.totalSold)}</Text>
      </View>
      <View className='pt-3 pb-3'>
        <FlatList
          style={{flexGrow: 0}}
          data={currentOrder?.order}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <OrderCardViewItem item={item} />
          )}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70
          }}
        />
      </View>
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
