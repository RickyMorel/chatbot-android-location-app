import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
          <Stack.Screen name="sign-in" options={{headerShown: false}}/>
          <Stack.Screen name="sign-up" options={{headerShown: false}}/>
          <Stack.Screen name="create-sale" options={{headerShown: false}}/>
          <Stack.Screen name="create-client" options={{headerShown: false}}/>
          <Stack.Screen name="create-client-location-screen" options={{headerShown: false}}/>
      </Stack>

      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout