import { Stack } from "expo-router";
import { AppProvider } from "../context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>

            <Stack
            screenOptions={{
              headerShown: false
            }}
          />

        </AppProvider>
    </GestureHandlerRootView>
  );
}