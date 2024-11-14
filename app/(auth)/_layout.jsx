import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { LoadingProvider } from '../LoadingProvider'
import Spinner from '../../components/Spinner'
import Utils from '../Utils'
import globalVars from '../globalVars'
import axios from 'axios'

const AuthLayout = () => {
  return (
    <>
      <LoadingProvider>
        <Spinner/>
      </LoadingProvider>
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