import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const jobs = [
  { id: "1", title: "Data Entry", salary: "Rp 100.000" },
  { id: "2", title: "Jaga Stand Event", salary: "Rp 150.000" },
];

export default function Jobs() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/job/${item.id}`)}
            style={{
              borderWidth: 1,
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.salary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}