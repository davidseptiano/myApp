import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Animated, { SlideInDown, SlideInLeft, SlideInRight } from "react-native-reanimated";

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  //set orientation on your device
  const [orientation, setOrientation] = useState("potrait");
  useEffect(() => {
    const updateOrientation = () =>{
      const {width, height} = Dimensions.get("window");
      if(width<height){
        setOrientation("potrait");
      } else {
        setOrientation("landscape");
      }
    };
    Dimensions.addEventListener("change",updateOrientation);
  });

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInLeft}>
        <Text>Screen width: {screenWidth}</Text>
      </Animated.View>
      <Animated.View entering={SlideInRight}>
        <Text>Screen height: {screenHeight}</Text>
      </Animated.View>
      <Animated.View entering={SlideInDown}>
        <Text>Orientation: {orientation}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 120,
    width:120,
    backgroundColor: "#b53df1",
    borderRadius: 20,
  },
});