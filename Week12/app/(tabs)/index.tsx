import React, { useState, useEffect } from "react";
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar,
  Image, ScrollView, Modal, TextInput, Switch,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications'; // Tambahan Modul 12
import Constants from 'expo-constants'; // Tambahan Modul 12
import { supabase } from "../../lib/supabase";

const { height: windowHeight, width } = Dimensions.get('window');

// --- PENGATURAN NOTIFIKASI ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken: string, title: string, body: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Gagal', 'Izin push notification tidak diberikan!');
    return;
  }

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    console.log('Project ID tidak ditemukan.');
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } catch (e) {
    console.log("Error mendapatkan push token", e);
  }

  return token;
}
// ------------------------------

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(""); // State Token Notifikasi

  // Settings State (Dari Week 9)
  const [name, setName] = useState("Ghiyats Nabil Rabbani");
  const [nim, setNim] = useState("00000100863");
  const [showSettings, setShowSettings] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [galleryEnabled, setGalleryEnabled] = useState(true);

  // Minta Izin Lokasi & Notifikasi Saat Aplikasi Dibuka
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Izin lokasi diperlukan untuk aplikasi ini.");
      }
    })();

    // Daftarkan perangkat untuk Push Notification
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? ""));
  }, []);

  // 📍 Dapatkan Lokasi (Fungsi Modifikasi Week 10 & 11)
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required.");
        return;
      }
      const currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });
      setLocation(currentLoc.coords);
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  // 📸 Buka Kamera (Fungsi Modifikasi Week 9 & 11)
  const openCamera = async () => {
    if (!cameraEnabled) {
      Alert.alert("Access Denied", "Camera access is disabled in Settings.");
      return;
    }
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await getCurrentLocation();
    }
  };

  // 🖼 Buka Galeri (Fungsi Modifikasi Week 9)
  const openGallery = async () => {
    if (!galleryEnabled) {
      Alert.alert("Access Denied", "Gallery access is disabled in Settings.");
      return;
    }
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission denied", "Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await getCurrentLocation();
    }
  };

  // ☁️ Upload ke Supabase & Trigger Notifikasi (Fungsi Week 11 & 12)
  const uploadData = async () => {
    if (!image) {
      Alert.alert("Error", "Pilih atau ambil foto terlebih dahulu!");
      return;
    }
    if (!location) {
      Alert.alert("Error", "Tunggu sebentar, sedang mendapatkan lokasi. Coba lagi.");
      await getCurrentLocation();
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(image);
      const arrayBuffer = await response.arrayBuffer();
      const fileName = `photo_${Date.now()}.jpg`;

      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, arrayBuffer, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      const imageUrl = data.publicUrl;

      const { error: dbError } = await supabase.from("photos").insert([
        {
          image_url: imageUrl,
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
        },
      ]);

      if (dbError) throw dbError;

      // TRIGGER NOTIFIKASI SUKSES (Tugas Week 12)
      if (expoPushToken) {
        await sendPushNotification(
          expoPushToken,
          "✅ Upload Berhasil!",
          `Data tersimpan. Lat: ${location.latitude.toFixed(5)}, Lng: ${location.longitude.toFixed(5)}`
        );
      }

      Alert.alert("Success! ✨", "Foto dan Geolocation berhasil diunggah ke Supabase!");
      setImage(null);
      setLocation(null);

    } catch (err: any) {
      console.log("Upload Error:", err);

      // TRIGGER NOTIFIKASI GAGAL (Tugas Week 12)
      if (expoPushToken) {
        await sendPushNotification(
          expoPushToken,
          "❌ Upload Gagal",
          `Terjadi kesalahan: ${err.message}`
        );
      }

      Alert.alert("Upload Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>
              SUPA<Text style={{ color: '#c084fc' }}>:SYNC</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => setShowSettings(true)}>
              <Ionicons name="settings" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pillContainer}>
          <View style={styles.pillActive}>
            <Text style={styles.pillTextActive}>{name || "Empty Name"}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{nim || "Empty ID"}</Text>
          </View>
        </View>

        <View style={styles.mainCanvas}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderTitle}>Snap & Sync</Text>
              <Ionicons name="image-outline" size={48} color="#333" style={{ marginTop: 10 }} />
            </View>
          )}

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#c084fc" />
              <Text style={styles.loadingText}>Uploading to Supabase...</Text>
            </View>
          )}
        </View>

        {location && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📍 Koordinat Terkini</Text>
            <View style={styles.coordRow}>
              <View style={styles.coordBox}>
                <Text style={styles.label}>LATITUDE</Text>
                <Text style={styles.value}>{location.latitude.toFixed(6)}</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={styles.label}>LONGITUDE</Text>
                <Text style={styles.value}>{location.longitude.toFixed(6)}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.floatingNav}>
        <TouchableOpacity style={styles.navButton} onPress={openGallery} disabled={loading}>
          <Ionicons name="images" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerNavButton} onPress={openCamera} disabled={loading}>
          <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={uploadData} disabled={!image || loading}>
          <Ionicons name="cloud-upload" size={24} color={image ? "#10b981" : "#444"} />
        </TouchableOpacity>
      </View>

      <Modal visible={showSettings} animationType="slide" transparent={true}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>

            <Text style={styles.modalLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#666"
            />

            <Text style={styles.modalLabel}>Student ID</Text>
            <TextInput
              style={styles.modalInput}
              value={nim}
              onChangeText={setNim}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />

            <View style={styles.toggleRow}>
              <Text style={styles.modalLabel}>Camera Access</Text>
              <Switch
                value={cameraEnabled}
                onValueChange={setCameraEnabled}
                trackColor={{ false: '#333', true: '#c084fc' }}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.modalLabel}>Gallery Access</Text>
              <Switch
                value={galleryEnabled}
                onValueChange={setGalleryEnabled}
                trackColor={{ false: '#333', true: '#c084fc' }}
              />
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={() => setShowSettings(false)}>
              <Text style={styles.modalButtonText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

// ================= STYLES GABUNGAN =================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000' },
  scrollContent: { paddingBottom: 130 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  logoText: { color: '#ffffff', fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center' },
  pillContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  pill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#333333' },
  pillActive: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#ffffff' },
  pillText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  pillTextActive: { color: '#000000', fontSize: 14, fontWeight: '700' },

  mainCanvas: {
    height: windowHeight * 0.5,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#0a0a0a',
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    position: 'relative'
  },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  placeholderTitle: { color: '#ffffff', fontSize: 32, fontWeight: 'bold', letterSpacing: -1 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 15, fontWeight: 'bold' },

  infoCard: { marginHorizontal: 20, backgroundColor: "#1E1E1E", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 5, elevation: 10, borderWidth: 1, borderColor: '#333' },
  infoTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15, color: "#E0E0E0" },
  coordRow: { flexDirection: "row", justifyContent: "space-between" },
  coordBox: { flex: 1, backgroundColor: "#2A2A2A", padding: 10, borderRadius: 8, marginHorizontal: 5 },
  label: { fontSize: 10, color: "#A0A0A0", marginBottom: 4 },
  value: { fontSize: 14, fontWeight: "600", color: "#FFF" },

  floatingNav: { position: 'absolute', bottom: 30, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(26, 26, 26, 0.9)', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 40, gap: 40, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  navButton: { padding: 5 },
  centerNavButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#c084fc', alignItems: 'center', justifyContent: 'center', shadowColor: '#c084fc', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 5 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#333' },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  modalLabel: { color: '#ccc', fontSize: 14, marginBottom: 8, marginTop: 12 },
  modalInput: { backgroundColor: '#000', color: '#fff', borderWidth: 1, borderColor: '#333', borderRadius: 10, padding: 12, fontSize: 16 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  modalButton: { backgroundColor: '#c084fc', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});