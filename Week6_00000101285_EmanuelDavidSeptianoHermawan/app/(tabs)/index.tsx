import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomTextInput, NIMInput } from "../input";

export default function Index() {

  const [name, setName] = useState("");
  const [nim, setNim] = useState("");

  return (
    <View style={styles.container}>

      <CustomTextInput
        value={name}
        onChangeText={setName}
      />

      <NIMInput
        value={nim}
        onChangeText={setNim}
      />

      <Text>Hello {name}</Text>
      <Text>NIM: {nim}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});