import { View, Text, StyleSheet } from 'react-native';

interface ProfileProps {
    name: string;
    age: number;
}

export default function Profile({ name, age }: ProfileProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Halo, saya {name} dan umur saya {age} tahun.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});