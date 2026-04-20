import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Nama: Enthy</Text>
      <Text>Email: enthy@mail.com</Text>

      <Button title="Logout" onPress={() => router.replace("/login")} />
    </View>
  );
}