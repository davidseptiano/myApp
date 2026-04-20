import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function JobDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Job ID: {id}</Text>
      <Text>Detail pekerjaan akan ditampilkan di sini</Text>

      <Button
        title="Apply Job"
        onPress={() => router.push("/job/apply")}
      />
    </View>
  );
}