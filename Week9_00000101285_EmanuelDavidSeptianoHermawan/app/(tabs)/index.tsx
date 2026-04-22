import { Text, View, Button, Image, StyleSheet } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  // 📸 OPEN CAMERA
  const openCamera = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission is required!");
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

  // 🖼️ OPEN GALLERY
  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 💾 SAVE IMAGE
  const saveImage = async () => {
    if (!image) {
      alert("No image to save!");
      return;
    }

    const permission = await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    try {
      // nama file aman
      const fileName =
        image.split("/").pop() || `photo_${Date.now()}.jpg`;

      // fix TypeScript error
      const newPath = (FileSystem as any).documentDirectory + fileName;

      // copy ke local storage
      await FileSystem.copyAsync({
        from: image,
        to: newPath,
      });

      // simpan ke gallery
      const asset = await MediaLibrary.createAssetAsync(newPath);
      await MediaLibrary.createAlbumAsync("MyApp", asset, false);

      alert("Image saved to gallery!");
    } catch (error) {
      console.log(error);
      alert("Failed to save image");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Emanuel David Septiano Hermawan - 00000101285
      </Text>

      <View style={styles.button}>
        <Button title="OPEN CAMERA" onPress={openCamera} />
      </View>

      <View style={styles.button}>
        <Button title="OPEN GALLERY" onPress={openGallery} />
      </View>

      <View style={styles.button}>
        <Button
          title="SAVE IMAGE"
          onPress={saveImage}
          disabled={!image} // biar lebih aman
        />
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
    </View>
  );
}

// 🎨 STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginVertical: 6,
    width: 180,
  },
  image: {
    width: 250,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});