import { View, StatusBar } from "react-native";
import useTheme from "@/constants/useTheme";

export default function Screen({ children }: any) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex:1,
        paddingTop: (StatusBar.currentHeight || 0) + 10,
        backgroundColor: theme.bg
      }}
    >
      {children}
    </View>
  );
}