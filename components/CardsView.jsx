import React, { Component } from 'react'
import { FlatList,View } from 'react-native'
import OrderCard from './OrderCard'
import OrderCardView from './OrderCardView'
export class CardsView extends Component {
  constructor() {
    super()

    this.state = {
      activeItem: undefined,
      viewingOrder: undefined
    }
  }

  componentDidMount() {
    this.setState({
      activeItem: this.props.posts[0]
    })
  }

  handleViewOrder = (order) => {
    this.setState({
      viewingOrder: order
    })
  }

  onViewableItemsChanged = ({viewableItems}) => {
    if(viewableItems.length > 0) {
      this.setState({
        activeItem: viewableItems[0].item.phoneNumber
      })
    }
  }

  render() {
    const {posts} = this.props

    return (
      <View>
        <OrderCardView currentOrder={this.state.viewingOrder} isOpen={this.state.viewingOrder != undefined} closeCallback={() => this.handleViewOrder(undefined)}/>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={({item}) => (
              <OrderCard activeItem={this.state.activeItem} item={item} viewOrderCallback={this.handleViewOrder}/>
          )}
          horizontal
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70
          }}
          contentOffset={{x: 170}}
        />
      </View>
    )
  }
}

export default CardsView