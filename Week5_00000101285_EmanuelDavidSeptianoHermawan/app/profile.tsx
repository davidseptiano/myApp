import { Link, useLocalSearchParams } from "expo-router";
import { Button, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function Profile() {

  const params = useLocalSearchParams();

  const userName = params.userName as string;
  const photo = params.photo as string;
  const email = params.email as string;

  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>

      <Avatar.Image
        size={120}
        source={{ uri: photo }}
      />

      <Text variant="titleLarge" style={{ color:"black", marginTop:10 }}>
        {userName}
      </Text>

      <Text variant="bodyMedium" style={{ color:"black" }}>
        {email}
      </Text>

      <Link href="/userList" push asChild>
        <Button title="Back to User List" />
      </Link>

    </View>
  );
}