import { Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import axios from 'axios';
import Utils from './Utils';
import globalVars from './globalVars';

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })

  const fetchGlobalConfig = async () => {
    console.log("TRY fetchGlobalConfig")
    try {
      const response = await axios.get(`${Utils.backendLink}/global-config`);

      console.log("fetchGlobalConfig", response.data?.companyLogoUrl)
      
      globalVars.setGlobalConfig(response.data)
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  useEffect(() => {
    fetchGlobalConfig()
    if(error) {console.log("ERROR", error); throw error}
    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null

  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='(auth)' options={{headerShown: false}}/>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
      {/* <Stack.Screen name='/search/[query]' options={{headerShown: false}}/> */}
    </Stack>
  )
}

export default RootLayout