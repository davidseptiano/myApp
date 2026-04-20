import { View, FlatList, Image, Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import products from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { AppContext } from "@/context/AppContext";
import useTheme from "@/constants/useTheme";
import Header from "@/components/Header";

export default function Home() {
  const { addToCart, addToWishlist, darkMode } = useContext(AppContext);
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = ["ALL", "Handphone", "Laptop", "Earphone", "Smartwatch", "Headphone", "Shoes"];
  
  // FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "ALL" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLocaleLowerCase());
    return matchCategory && matchSearch
  });

  return (
    <View style={{ flex:1, backgroundColor: theme.bg }}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom:100 }}
      
        ListHeaderComponent={
          <>
            {/* 🔥 HEADER */}
            <Header>
              <Text style={{ color:"#fff", fontSize:20, fontWeight:"bold" }}>
              Welcome To Market Shop 👋
              </Text>

              {/* SEARCH */}
              <View style={{
                marginTop:10,
                backgroundColor:"#fff",
                borderRadius:10,
                flexDirection:"row",
                alignItems:"center",
                paddingHorizontal:10
              }}>
              <Ionicons name="search" size={18} color="gray"/>
              <TextInput
                placeholder="Search product..."
                value={search}
                onChangeText={setSearch}
                style={{ flex:1, padding:10 }}
              />
              </View>
            </Header>

            {/* 🎯 SLIDER */}
            <View style={{ height:250, marginTop:10 }}>
              <Swiper
                autoplay
                autoplayTimeout={3}
                showsPagination
                dotColor="#ccc"
                activeDotColor="#fff"
                loop
              >
                {products.slice(0,10).map(item=>(
                  <View key={item.id} style={{ paddingHorizontal:10 }}>
                    <Image
                      source={{ uri:item.image }}
                      style={{
                        width:"100%",
                        height:250,
                        borderRadius:20
                      }}
                    />
                  </View>
                ))}
              </Swiper>
            </View>

            {/* TITLE */}
            <Text style={{
              fontSize:18,
              fontWeight:"bold",
              margin:10,
              color: darkMode ? "#fff" : "#000"
            }}>
              Popular Products 🔥
            </Text>

            {/* CATEGORY FILTER */}
            <View style={{ marginTop: 10 }}>
              <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setCategory(item)}
                style={{
                  marginRight:10,
                  paddingVertical:8,
                  paddingHorizontal:14,
                  borderRadius:20,
                  backgroundColor:
                    category === item
                    ? "#fff"
                    : "hsl(0, 0%, 100%)"
                }}
                >
                  <Text
                  style={{
                    color: category === item ? "#4facfe" : "gray",
                    fontWeight:"bold"
                  }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              />
            </View>
          </>
        }

        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onCart={() => addToCart(item)}
            onWishlist={() => addToWishlist(item)}
          />
        )}
      />
</View>

  );
}