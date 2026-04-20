import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { formatRupiah } from "@/constants/format";
import useTheme from "@/constants/useTheme";
import Screen from "@/components/Screen";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function Wishlist() {
  const { wishlist, setWishlist, addToCart } = useContext(AppContext);
  const theme = useTheme();

  const renderRight = (item: WishlistItem) => (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      
      {/* ADD TO CART */}
      <RectButton
        onPress={() => addToCart(item)}
        style={{
          backgroundColor: "#4facfe",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10
        }}
      >
        <Ionicons name="cart" size={22} color="#fff" />
        <Text style={{ color:"#fff", fontSize:12, marginTop:5 }}>
          Add
        </Text>
      </RectButton>

      {/* DELETE */}
      <RectButton
        onPress={() =>
          setWishlist(wishlist.filter((w: WishlistItem) => w.id !== item.id))
        }
        style={{
          backgroundColor: "#ff4d4d",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10
        }}
      >
        <Ionicons name="trash" size={22} color="#fff" />
        <Text style={{ color:"#ffffff", fontSize:12, marginTop:5 }}>
          Remove
        </Text>
      </RectButton>

    </View>
  );

  return (
    <Screen>
    <FlatList
      data={wishlist}
      keyExtractor={(item: WishlistItem) => item.id}
      contentContainerStyle={{ padding:15 }}

      ListEmptyComponent={
        <View style={{ alignItems:"center", marginTop:80 }}>
          <Ionicons name="heart-dislike" size={60} color="#ccc" />
          <Text style={{ fontSize:18, marginTop:10, color:"gray" }}>
            Your wishlist is empty
          </Text>
          <Text style={{ color:"#aaa", marginTop:5 }}>
            Start adding your favorite items ❤️
          </Text>
        </View>
      }

      renderItem={({ item }: { item: WishlistItem }) => (
        <Swipeable renderRightActions={() => renderRight(item)}>
          
          <View style={{
            backgroundColor:"#fff",
            borderRadius:20,
            marginBottom:15,
            elevation:4,
            overflow:"hidden"
          }}>
            
            {/* IMAGE */}
            <View style={{ position:"relative" }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width:"100%",
                  height:180
                }}
              />

              {/* HEART BADGE */}
              <View style={{
                position:"absolute",
                top:10,
                right:10,
                backgroundColor:"rgba(255,255,255,0.9)",
                padding:6,
                borderRadius:20
              }}>
                <Ionicons name="heart" size={18} color="red"/>
              </View>
            </View>

            {/* INFO */}
            <View style={{ padding:12 }}>
              
              <Text style={{
                fontWeight:"bold",
                fontSize:15
              }}>
                {item.name}
              </Text>

              <Text style={{
                color:"green",
                fontWeight:"bold",
                marginTop:5
              }}>
                {formatRupiah(item.price)}
              </Text>
            </View>

          </View>

        </Swipeable>
      )}
    />
    </Screen>
  );
}