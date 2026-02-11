import{ ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
    <View style={styles.card}>
      <Image
        source={require('../../assets/images/download (1).jpg')}
        style={styles.image}
      />
      <Text style={styles.name}>Emanuel David Septiano Hermawan</Text>
        <Text style={styles.info}>00000101285</Text>
    </View>
    
    <View style={styles.card}>
      <Image
        source={require('../../assets/images/download (2).jpg')}
        style={styles.image}
      />
      <Text style={styles.name}>Nita Rimila</Text>
        <Text style={styles.info}>00000101345</Text>
    </View>

    <View style={styles.card}>
      <Image
        source={require('../../assets/images/download (3).jpg')}
        style={styles.image}
      />
      <Text style={styles.name}>John Thor</Text>
        <Text style={styles.info}>johnthor@example.com</Text>
    </View>

    <View style={styles.card}>
      <Image
        source={require('../../assets/images/download (4).jpg')}
        style={styles.image}
      />
      <Text style={styles.name}>Mulyono</Text>
        <Text style={styles.info}>mulyono@2periode.com</Text>
    </View>

    <View style={styles.card}>
      <Image
        source={require('../../assets/images/download (5).jpg')}
        style={styles.image}
      />
      <Text style={styles.name}>Prabowo</Text>
        <Text style={styles.info}>hidupjokowi@golkar.com</Text>
    </View>

    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    paddingVertical: 20,
  },
  card: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray'
  },
  info: {
    fontSize: 14,
    color: 'gray',
  },
});
