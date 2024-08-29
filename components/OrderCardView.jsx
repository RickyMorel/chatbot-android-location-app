import React, { Component } from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Link } from 'expo-router';
import CustomButton from './CustomButton';

class OrderCardView extends Component {
  render() {
    const { currentOrder, isOpen, closeCallback } = this.props;

    const tableData = {
        tableHead: ['Nombre Item', 'Cantidad', 'Precio'],
        tableData: currentOrder?.order?.map(x => {
            return ([x.name, x.amount, `${Intl.NumberFormat('de-DE').format(x.price)}gs`])
        }),
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
              <Text className="text-right">Total: {Intl.NumberFormat('de-DE').format(currentOrder?.totalSold)}gs</Text>
            </View>
            <Table className="w-[300px]">
                <Row data={tableData.tableHead} style={styles.head} textStyle={styles.headText} />
                <Rows data={tableData.tableData} textStyle={styles.text} />
            </Table>
            <View className="flex-row">
              <Link href={`/create-sale?data=${serializedData}`} onPress={closeCallback} className='text-lg font-psemibold text-secondary'>Hacer Venta</Link>
              {/* <Link href={`/create-sale`} className='text-lg font-psemibold text-secondary'>Hacer Venta</Link> */}
              <CustomButton title="Cerrar" handlePress={closeCallback}/>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, justifyContent: 'center'},
    head: { height: 44},
    headText: { fontSize: 15, fontWeight: 'bold' , textAlign: 'center', verticalAlign:'top'},
    text: { margin: 6, fontSize: 13 , textAlign: 'center', verticalAlign:'top' },
})

export default OrderCardView;
