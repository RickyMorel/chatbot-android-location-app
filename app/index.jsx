import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../components/Spinner";
import SignIn from "./(auth)/sign-in";

export default function App() {
  return(
    <>
      <Spinner/>
      <SafeAreaView className="bg-primary h-full">
        <SignIn/>
      </SafeAreaView>
    </>
  )
}