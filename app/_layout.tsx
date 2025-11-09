import { Stack, SplashScreen } from "expo-router";
import "../globals.css";
import { useFonts } from 'expo-font';
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
	  "LibreCaslonText-Regular": require("../assets/fonts/LibreCaslonText-Regular.ttf"),
	  "LibreCaslonText-Italic": require("../assets/fonts/LibreCaslonText-Italic.ttf"),
	  "LibreCaslonText-Bold": require("../assets/fonts/LibreCaslonText-Bold.ttf"),
  });

  useEffect(() => {
	  if (error) {
		  throw error
	  }
	  if (fontsLoaded) {
		  SplashScreen.hideAsync();
	  }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
	  return null;
  }

  return (
	  <Stack>
		<Stack.Screen
			name="(tabs)"
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name="settings"
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name="preload/[model]"
			options={{
				headerShown: false
			}}
		/>
	  </Stack>
  );
}
