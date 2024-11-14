import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../components/Spinner";
import SignIn from "./(auth)/sign-in";
import { LoadingProvider } from "./LoadingProvider";
import Map from "./(tabs)/map";

export default function App() {
  return(
    <>
      <LoadingProvider>
        <Spinner/>
      </LoadingProvider>
      <SafeAreaView className="bg-primary h-full">
        <SignIn/>
      </SafeAreaView>
    </>
  )
}