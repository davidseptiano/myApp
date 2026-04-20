import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // simple validation (dummy)
        if (username === "Admin" && password === "123"){
            router.replace("/(tabs)");// masuk ke home
        } else {
            alert("Username / Password salah!");
        }
    };

    return (
        <View style={{
            flex:1,
            justifyContent:"center",
            padding:20,
            backgroundColor:"#f5f5f5"
        }}>

            <Text style={{
                fontSize:24,
                fontWeight:"bold",
                marginBottom:20,
                textAlign:"center"
            }}>
                Login
            </Text>

            <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{
                backgroundColor:"#fff",
                padding:12,
                borderRadius:10,
                marginBottom:10
            }}
            />

            <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
                backgroundColor:"#fff",
                padding:12,
                borderRadius:10,
                marginBottom:20
            }}
            />

            <TouchableOpacity
            onPress={handleLogin}
            style={{
                backgroundColor:"#4facfe",
                padding:15,
                borderRadius:10
            }}
            >
                <Text style={{ color:"#fff", textAlign:"center" }}>
                    Login
                </Text>
            </TouchableOpacity>

        </View>
    );
}