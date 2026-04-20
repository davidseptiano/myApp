import { Stack } from "expo-router";

export default function RootLayout() {
  const isLogin = false; // nanti diganti auth

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLogin ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}