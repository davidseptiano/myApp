import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StatusBar } from "react-native";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <LinearGradient
      colors={["#4facfe","#00f2fe"]}
      style={{
        paddingTop: (StatusBar.currentHeight || 0) + 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}
    >
      <View>
        {children}
      </View>
    </LinearGradient>
  );
}