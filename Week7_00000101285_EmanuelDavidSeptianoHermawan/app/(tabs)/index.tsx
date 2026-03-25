import { Link, Stack } from "expo-router";
import { View, Button } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Link href="/userList" asChild>
          <Button title="Go To User List" />
        </Link>
      </View>
    </>
  );
}