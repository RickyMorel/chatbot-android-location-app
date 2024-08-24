import React, { Component } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import { images } from '../../constants'
import makeRequest from '../../lib/useAppwrite'
import { isLoading } from 'expo-font'
import VideoCard from '../../components/VideoCard'

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      refreshing: false,
      isLoading: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const response = [{
      title: "How AI Shpaes Coding Future",
      thumbnail: "https://miro.medium.com/v2/resize:fit:366/0*hQqXIZ3yjxTPjbQI.jpg",
      creator: "Ricardo",
      id: 1
    },
    {
      title: "How Pikachu is the nest",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPRSk2MjJEzjeeSnl_AhVQ2YfMty0kQRlpw&s",
      creator: "Alvaro",
      id: 2
    },
    {
        title: "Greedfall best tips",
      thumbnail: "https://i.redd.it/xqr4pa679mm31.jpg",
      creator: "Juan",
      id: 3
    },
    {
      title: "Crazy space facts",
      thumbnail: "https://wallpapers.com/images/hd/illustration-in-space-4k-phone-xuuhy1m9n43v2zi5.jpg",
      creator: "Ivo",
      id: 4
    }]
    
    try {
        //const response = await fn();
        const data = response;  // Mocked data processing
        this.setState({
          data: data
        })
    } catch (err) {
        Alert.alert("Error", err.message);
    } finally {
        this.setState({
          isLoading: false
        })
    }
};

  onRefresh = async () => {
    this.setState({
      refreshing: true
    })
    this.fetchData()
    this.setState({
      refreshing: false
    })
  }

  render() {
    return (
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

              <SearchInput/>

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
                <Trending posts={this.state?.data ?? []}/>
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