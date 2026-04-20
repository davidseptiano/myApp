import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

import useTheme from "@/constants/useTheme";
import { AppContext } from "@/context/AppContext";

// ✅ TYPE
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: Record<string, string>;
};

type CartItem = Product & {
  qty: number;
};

export default function ProductDetail() {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const theme = useTheme();

  const { addToCart, addToWishlist, wishlist } = useContext(AppContext);

  // 🔥 SAFE PARSE
  let product: Product | null = null;

  try {
    product = data ? JSON.parse(data as string) : null;
  } catch (e) {
    console.log("Parse error:", e);
  }

  // 🔥 LOADING
  if (!product) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  // 🔥 FORMAT CART ITEM
  const formattedProduct: CartItem = {
    ...product,
    qty: 1
  };

  // 🔥 STATE CHECK
  const isWishlisted = wishlist.some((i: Product) => i.id === product!.id);

  // 🔥 HANDLER
  const handleAddToCart = () => {
    addToCart(formattedProduct);
    router.back();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product!);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>

      {/* 🔥 IMAGE */}
      <View>
        <Image
          source={{ uri: product.image }}
          style={{ width: "100%", height: 320 }}
        />

        {/* BACK */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 50,
            left: 15,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 8,
            borderRadius: 20
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>

        {/* WISHLIST */}
        <TouchableOpacity
          onPress={handleAddToWishlist}
          style={{
            position: "absolute",
            top: 50,
            right: 15,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 8,
            borderRadius: 20
          }}
        >
          <Ionicons 
            name={isWishlisted ? "heart" : "heart-outline"}
            size={22} 
            color={isWishlisted ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* 🔥 CONTENT */}
      <ScrollView style={{ padding: 15 }}>

        {/* NAME */}
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          color: theme.text
        }}>
          {product.name}
        </Text>

        {/* PRICE */}
        <Text style={{
          fontSize: 20,
          color: "#4facfe",
          fontWeight: "bold",
          marginTop: 5
        }}>
          Rp {product.price.toLocaleString()}
        </Text>

        {/* SPEC */}
        <View style={{
          marginTop: 15,
          backgroundColor: theme.card,
          padding:15,
          borderRadius: 15,
          elevation: 3
        }}>
          <Text style={{
            fontWeight: "bold",
            marginBottom: 10,
            color: theme.text
          }}>
            Specification
          </Text>

          {product.description ? (
            Object.entries(product.description).map(([key, value]) => (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8
                }}
              >
                <Text style={{ color: theme.sub }}>
                  {key.toUpperCase()}
                </Text>
                <Text style={{ color: theme.text, fontWeight: "bold" }}>
                  {value}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ color: theme.sub }}>
              No description available
            </Text>
          )}
        </View>

      </ScrollView>

      {/* 🔥 BOTTOM */}
      <View style={{
        backgroundColor: theme.card,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10
      }}>
        <Text style={{
          fontSize:18,
          fontWeight:"bold",
          color: theme.text
        }}>
          Rp {product.price.toLocaleString()}
        </Text>

        <TouchableOpacity
          onPress={handleAddToCart}
          style={{
            backgroundColor:"#4facfe",
            paddingVertical:12,
            paddingHorizontal:25,
            borderRadius:10
          }}
        >
          <Text style={{ color:"#fff", fontWeight:"bold" }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}