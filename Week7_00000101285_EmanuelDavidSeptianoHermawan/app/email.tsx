import { Link } from "expo-router";
import { Button, Text, View } from "react-native";
import styles from "./(tabs)/AppStyles";

export default function email() {
  return (
    <View style={styles.container}>
      <Text>Email List Page</Text>

      <Link href="/userList" push asChild>
        <Button title="Go to User List" />
      </Link>
    </View>
  );
}