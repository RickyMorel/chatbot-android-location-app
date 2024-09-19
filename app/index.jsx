import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import SignIn from "./(auth)/sign-in";

export default function App() {
  return(
    <SafeAreaView className="bg-primary h-full">
      <SignIn/>
    </SafeAreaView>
  )
}