import { View, Text, Button, StyleSheet } from 'react-native';

interface CounterProps {
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export default function Counter({
  value,
  handleIncrement,
  handleDecrement,
}: CounterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Umur: {value}</Text>

      {/* Bungkus tombol di View baru */}
      <View style={styles.buttonContainer}>
        <Button title="Kurang" onPress={handleDecrement} />
        <Button title="Tambah" onPress={handleIncrement} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',   // bikin horizontal
    gap: 12,                // ⭐ jarak antar tombol (Expo baru support)
  },
});
