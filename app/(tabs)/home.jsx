import { Text, View, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { isLoading } from 'expo-font'
import useAppwrite from '../../lib/useAppwrite'

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      refreshing: false,
    }
  }

  componentDidMount() {

  }

  onRefresh = async () => {
    this.setState({
      refreshing: true
    })
    this.setState({
      refreshing: false
    })
  }

  render() {
    const {data} = useAppwrite(() => ({
      title: "How AI Shpaes Coding Future",
      thumnail: "https://mfiles.alphacoders.com/100/thumb-1008659.png",
      creator: "Ricardo"
  }))
    // console.log("DATA IN HOMEEEEEE", data)

    return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList 
          data={[]} 
          keyExtractor={(item) => item.id} 
          renderItem={({item}) => (
            <Text className="text-3xl text-white">{item.id}</Text>
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

              <SearchInput/>

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
                <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}/>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle="Be the first one to upload a video!"/>
          )}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
        />
      </SafeAreaView>
    )
  }
}

export default Home