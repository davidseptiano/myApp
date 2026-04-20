import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        value={email}
        onChangeText={setEmail}
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={() => router.replace("/")} />
    </View>
  );
}