import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 📸 Open Camera
  const openCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📍 Get Location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission denied", "Location access is required.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  // ☁️ Upload to Supabase
  const uploadData = async () => {
  if (!image || !location) {
    Alert.alert("Error", "Please take a photo and get location first.");
    return;
  }

  try {
    setLoading(true);

    console.log("START");

    // convert image
    const response = await fetch(image);
    const arrayBuffer = await response.arrayBuffer();

    console.log("ARRAY BUFFER OK");

    const fileName = `photo_${Date.now()}.jpg`;

    // upload storage
    const { data: uploadResult, error: uploadError } =
      await supabase.storage
        .from("images")
        .upload(fileName, arrayBuffer, {
          contentType: "image/jpeg",
        });

    console.log("UPLOAD RESULT:", uploadResult);
    console.log("UPLOAD ERROR:", uploadError);

    if (uploadError) throw uploadError;

    // get public URL
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    console.log("IMAGE URL:", imageUrl);

    // insert database
    const { data: dbData, error: dbError } = await supabase
      .from("photos")
      .insert([
        {
          image_url: imageUrl,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      ]);

    console.log("DB DATA:", dbData);
    console.log("DB ERROR:", dbError);

    if (dbError) throw dbError;

    Alert.alert("Success", "Upload successful!");
  } catch (err: any) {
    console.log("FINAL ERROR:", err);
    Alert.alert("Error", err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera + Location + Supabase</Text>

      <View style={styles.button}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>

      <View style={styles.button}>
        <Button title="Get Location" onPress={getLocation} />
      </View>

      <View style={styles.button}>
        <Button
          title={loading ? "Uploading..." : "Upload"}
          onPress={uploadData}
          disabled={loading}
        />
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {location && (
        <Text style={styles.location}>
          Lat: {location.latitude} | Lng: {location.longitude}
        </Text>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f7fb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    width: 200,
    marginVertical: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
  location: {
    marginTop: 10,
    fontSize: 14,
  },
});