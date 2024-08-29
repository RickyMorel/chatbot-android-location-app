import { Text, View } from 'react-native'
import React, { Component } from 'react'
import CustomButton from '../../components/CustomButton'

export class CreateSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sale: props.route.params?.saleData || undefined,
      isLoading: false,
    };
  }

    createSale = async () => {
        this.setState({
          isLoading: true
        })
    
       try {
          const response = await axios.post(`http://192.168.100.4:3000/sales/createSale`, this.state.sale);
        } catch (error) {console.log('Error:', error.message);} 
        finally {
          this.setState({
            isLoading: false
          })
        }
    };

    render() {
        return (
        <View>
            <CustomButton title="Cerrar Venta" handlePress={this.createSale}/>
        </View>
        )
    }
}

export default CreateSale