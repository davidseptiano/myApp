import { TextInput, StyleSheet } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function CustomTextInput({ value, onChangeText }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter your name"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

export function NIMInput({ value, onChangeText }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter your NIM"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    width: 250,
  },
});