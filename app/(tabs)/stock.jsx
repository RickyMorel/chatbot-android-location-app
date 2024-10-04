import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StockEntry from '../../components/StockEntry'
import axios from 'axios';
import Utils from '../Utils'
import globalVars from '../globalVars';
import Constants from 'expo-constants';

const Card = ({title, value}) => {
  return(
    <View className="rounded-lg h-[80px] w-[150px] shadow-lg bg-white flex justify-center items-center border border-black m-5">
      <Text className="text-center">{title}</Text>
      <Text className="text-center">{value}</Text>
    </View>
  )
}

export class Stock extends Component {
  constructor() {
    super()

    this.state = {
      clientAmount: 0,
      allProducts: [],
      itemImages: [],
      totalMoney: 0
    }
  }

  componentDidMount() {
    this.fetchOrderData()
  }

  fetchOrderData = async () => {
    console.log("fetchOrderData")
    this.setState({
      isLoading: true
    })

   try {
      const response = await axios.get(`${Constants.expoConfig.extra.apiUrl}/order/confirmed?movil=${globalVars.getUser().movil}`);
      console.log("stock response", response.data)

      let totalProducts = []
      let totalMoney = 0

      response?.data?.forEach(order => {    
        totalMoney += order.totalSold 
        order.order.forEach(product => {
          let prevProduct = totalProducts.find(x => x.code == product.code)
  
          if(prevProduct) { prevProduct.amount += product.amount }
          else {totalProducts.push(product)}
        });
      });

      console.log("totalProducts", totalProducts)

      this.setState({
        allProducts: totalProducts,
        clientAmount: response?.data?.length,
        totalMoney: totalMoney
      })

      this.fetchProductImages(totalProducts)
    } catch (error) {console.log('Error:', error.message);} 
    finally {
      this.setState({
        isLoading: false
      })
    }
  };

  fetchProductImages = async (allProducts) => {
    this.setState({
      isLoading: true
    })

   try {
      const response = await axios.put(`${Constants.expoConfig.extra.apiUrl}/inventory/getItemsByCode`, allProducts.map(x => x.code));

      this.setState({
        itemImages: response.data
      })
    } catch (error) {console.log('Error:', error.message);} 
    finally {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View className="flex-row items-center justify-center">
          <Card title="Clientes" value={this.state?.clientAmount}/>
          <Card title="Promedio" value={Utils.formatCurrency(this.state?.totalMoney)}/>
        </View>
        <FlatList
          data={this.state?.allProducts}
          keyExtractor={(item) => item.code}
          renderItem={({item}) => (
              <StockEntry item={item} image={this.state?.itemImages?.find(x => x.code == item.code)?.imageLink}/>
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70
          }}
        />
      </SafeAreaView>
    )
  }
}

export default Stock