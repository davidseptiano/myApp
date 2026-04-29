import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const { height } = Dimensions.get("window");

export default function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);

  // 📍 Get current location
  const getLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied! Please allow location access.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  // 📍 Handle tap on map
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  // 📍 Handle drag marker
  const handleMarkerDrag = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  // 📍 Map region (auto follow marker)
  const region: Region | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  return (
    <View style={styles.container}>
      {!location ? (
        <View style={styles.center}>
          <Button title="Get Geo Location" onPress={getLocation} />
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={location}
              title="My Location"
              draggable
              onDragEnd={handleMarkerDrag}
            />
          </MapView>

          <View style={styles.info}>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>

            <Button title="Refresh Location" onPress={getLocation} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: height * 0.5,
    width: "100%",
  },
  info: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});