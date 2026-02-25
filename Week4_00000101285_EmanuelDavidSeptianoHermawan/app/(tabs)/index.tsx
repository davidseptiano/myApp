import { Stack } from "expo-router";
import { ScrollView, View, StyleSheet } from "react-native";
import { 
  Card, 
  Avatar, 
  Title, 
  Paragraph, 
  Searchbar, 
  Divider, 
  FAB 
} from "react-native-paper";
import { useState } from "react";
import userData from "./data.json";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack.Screen options={{ title: "User List" }} />

      <Searchbar
        placeholder="Search user..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <ScrollView>
        {filteredUsers.map((user, index) => (
          <View key={index}>
            <Card style={styles.card}>
              <Card.Content style={styles.row}>
                <Avatar.Image
                  size={70}
                  source={{ uri: user.photo_url }}
                />
                <View style={styles.textContainer}>
                  <Title>{user.name}</Title>
                  <Paragraph>{user.email}</Paragraph>
                </View>
              </Card.Content>
            </Card>
            <Divider />
          </View>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Add user")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    margin: 10,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  textContainer: {
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});