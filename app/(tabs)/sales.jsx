import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StockEntry from '../../components/StockEntry'
import axios from 'axios';
import SalesEntry from '../../components/SalesEntry';

const Card = ({title, value}) => {
  return(
    <View className="rounded-lg h-[80px] w-[150px] shadow-lg bg-white flex justify-center items-center border border-black m-5">
      <Text className="text-center">{title}</Text>
      <Text className="text-center">{value}</Text>
    </View>
  )
}

export class Sales extends Component {
  constructor() {
    super()

    this.state = {
      allSales: [],
      itemImages: []
    }
  }

  componentDidMount() {
    this.fetchSales()
  }

  fetchSales = async () => {
    this.setState({
      isLoading: true
    })

   try {
      const response = await axios.get(`http://192.168.100.4:3000/sales`);

      this.setState({
        allSales: response.data,
      })
    } catch (error) {console.log('Error:', error.message);} 
    finally {
      this.setState({
        isLoading: false
      })
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View className="flex-row items-center justify-center">
          {/* <Card title="Clientes" value={this.state?.clientAmount}/>
          <Card title="Promedio" value={`${Intl.NumberFormat('de-DE').format(this.state?.totalMoney)}gs`}/> */}
        </View>
        <FlatList
          data={this.state?.allSales}
          keyExtractor={(sale) => sale.clientPhoneNumber}
          renderItem={({sale}) => (
              <SalesEntry sale={sale}/>
          )}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70
          }}
        />
      </SafeAreaView>
    )
  }
}

export default Sales