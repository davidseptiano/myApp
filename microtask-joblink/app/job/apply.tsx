import { View, Text, Button } from "react-native";

export default function Apply() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Apply Job</Text>
      <Text>Kirim CV / Portfolio</Text>

      <Button title="Submit" onPress={() => alert("Lamaran berhasil!")} />
    </View>
  );
}