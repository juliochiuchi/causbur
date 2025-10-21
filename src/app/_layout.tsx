import "@/global.css";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }
  
  return (
    <View className="flex-1 bg-causbur-background-screen pt-10">
      <Slot />
    </View>
  )
}
