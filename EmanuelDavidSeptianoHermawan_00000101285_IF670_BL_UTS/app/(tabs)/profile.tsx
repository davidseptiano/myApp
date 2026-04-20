import { View, Text, Switch, TouchableOpacity, Image, Alert } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { light, dark } from "@/constants/theme";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const { cart, wishlist, history, darkMode, setDarkMode } = useContext(AppContext);
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const theme = darkMode ? dark : light;

  const handleLogout = () => {
    router.replace("/login");
  };

  // 🔥 PICK FROM GALLERY
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 🔥 TAKE PHOTO
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 🔥 CHOOSE SOURCE
  const chooseImage = () => {
    Alert.alert("Change Profile Photo", "Choose source", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg }}>
      
      {/* HEADER */}
      <LinearGradient colors={["#4facfe","#00f2fe"]} style={{
        padding:40,
        alignItems:"center",
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
      }}>

        {/* 🔥 PROFILE IMAGE (CLICKABLE) */}
        <TouchableOpacity onPress={chooseImage}>
          <View style={{ elevation: 5 }}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("@/assets/images/-rgbgnw.jpg")
              }
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                marginBottom: 10,
                borderWidth: 3,
                borderColor: "#fff",
              }}
            />
          </View>
        </TouchableOpacity>

        <Text style={{ color:"#fff", fontSize:17, fontWeight:"bold" }}>
          Emanuel David Septiano Hermawan
        </Text>

        <Text style={{ color:"#e0f7ff" }}>
          NIM: 00000101285
        </Text>
      </LinearGradient>

      {/* STATS */}
      <View style={{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:15
      }}>
        {[
          { label:"Cart", value:cart.length, icon:"cart" },
          { label:"Wishlist", value:wishlist.length, icon:"heart" },
          { label:"History", value:history.length, icon:"receipt" }
        ].map((item, index) => (
          <View key={index} style={{
            backgroundColor: theme.card,
            padding:15,
            borderRadius:15,
            alignItems:"center",
            width:90,
            elevation:3
          }}>
            <Ionicons name={item.icon as any} size={22} color={theme.primary}/>
            <Text style={{ fontWeight:"bold", marginTop:5, color: theme.text }}>
              {item.value}
            </Text>
            <Text style={{ fontSize:12, color: theme.sub }}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* MENU */}
      <View style={{ marginTop:20, paddingHorizontal:15 }}>
        
        {/* DARK MODE */}
        <View style={{
          backgroundColor: theme.card,
          borderRadius:15,
          padding:15,
          marginBottom:10,
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <View style={{ flexDirection:"row", alignItems:"center" }}>
            <Ionicons name="moon" size={20} color={theme.primary}/>
            <Text style={{ marginLeft:10, color: theme.text }}>
              Dark Mode
            </Text>
          </View>

          <Switch value={darkMode} onValueChange={setDarkMode}/>
        </View>

        {/* SETTINGS */}
        <TouchableOpacity style={{
          backgroundColor: theme.card,
          borderRadius:15,
          padding:15,
          marginBottom:10,
          flexDirection:"row",
          alignItems:"center"
        }}>
          <Ionicons name="settings" size={20} color={theme.primary}/>
          <Text style={{ marginLeft:10, color: theme.text }}>
            Settings
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity 
          onPress={handleLogout}
          style={{
            backgroundColor:"#ff4d4d",
            borderRadius:15,
            padding:15,
            marginTop:20,
            alignItems:"center"
          }}>
          <Text style={{ color:"#fff", fontWeight:"bold" }}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}