import { Link } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import styles from "./(tabs)/AppStyles";
import userData from "./(tabs)/data.json";

import Animated, { FadeInDown } from "react-native-reanimated"; // ✅ TAMBAHAN

export default function UserList() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData.map((users, index) => (

        // ✅ WRAP dengan Animated.View
        <Animated.View
          key={index}
          entering={FadeInDown.delay(index * 300)} // ✅ delay beda tiap user
        >
          <Card style={styles.card}>
            <Link
              href={{
                pathname: "/profile",
                params: {
                  userName: users.name,
                  photo: users.photo_url,
                  email: users.email
                },
              }}
              push
              asChild
            >
              <TouchableOpacity>
                <Card.Content style={styles.cardContent}>
                  <Avatar.Image
                    size={70}
                    source={{ uri: users.photo_url }}
                  />

                  <View style={styles.textContainer}>
                    <Text variant="titleMedium">{users.name}</Text>
                    <Text variant="bodyMedium">{users.email}</Text>
                  </View>
                </Card.Content>
              </TouchableOpacity>
            </Link>
          </Card>
        </Animated.View>

      ))}
    </ScrollView>
  );
}