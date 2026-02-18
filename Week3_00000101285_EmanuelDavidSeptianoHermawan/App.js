import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Counter from './components/Counter';
import Profile from './components/Profile';

export default function App() {
  const [age, setAge] = useState(0);
  const [name, setName] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleIncrement = () => setAge(age + 1);
  const handleDecrement = () => setAge(age - 1);

  const handlePassValue = () => {
    setShowProfile(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        value={name}
        onChangeText={setName}
      />

      <Counter
        value={age}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />

      <Button title="Pass Value" onPress={handlePassValue} />

      {showProfile && (
        <Profile
          name={name || 'Anonymous'}
          age={age}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
