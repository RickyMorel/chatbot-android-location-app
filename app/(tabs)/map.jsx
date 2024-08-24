import { Text, View, FlatList, RefreshControl, Image } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapComponent from '../../components/MapComponent'
import { images } from '../../constants'
import CardsView from '../../components/CardsView'

export class Map extends Component {
  constructor() {
    super()
    this.state = {
      refreshing: false,
      isLoading: false,
      data: [],
    }
  }

  render() {
    return (
      <View>
        <MapComponent/>
        <SafeAreaView className="bg-primary h-full">
          <FlatList 
            data={this.state?.data} 
            keyExtractor={(item) => item.id} 
            renderItem={({item}) => (
              <VideoCard video={item}/>
            )}
            ListHeaderComponent={() => (
              <View className="my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                    <Text className="text-2xl font-psemibold text-white">JSMastery</Text>
                  </View>

                  <View className="mt-1.5">
                    <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain'/>
                  </View>
                </View>

                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
                  <CardsView posts={this.state?.data ?? []}/>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState title="No videos found" subtitle="Be the first one to upload a video!"/>
            )}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
          />
        </SafeAreaView>
      </View>
    )
  }
}

export default Map