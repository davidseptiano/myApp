import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useTheme from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainTabs />
    </GestureHandlerRootView>
  );
}

function MainTabs() {
  const theme = useTheme();
  const { cart, wishlist } = useContext(AppContext);

  const totalCart = cart.reduce((s:number, i:any) => s + i.qty, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.card },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.sub
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color}/>
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={20} color={color}/>,
          tabBarBadge: totalCart > 0 ? totalCart : undefined
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={20} color={color}/>,
          tabBarBadge: wishlist.length > 0 ? wishlist.length : undefined
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <Ionicons name="receipt" size={20} color={color}/>
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={20} color={color}/>
        }}
      />
    </Tabs>
  );
}