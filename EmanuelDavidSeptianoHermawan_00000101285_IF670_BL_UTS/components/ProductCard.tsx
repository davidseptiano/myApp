import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRupiah } from "@/constants/format";
import useTheme from "@/constants/useTheme";
import { useRouter } from "expo-router";

export default function ProductCard({ item, onCart, onWishlist }: any) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/product-detail",
          params: { data: JSON.stringify(item) }
        })
      }
      style={{
        flex:1,
        margin:8,
        backgroundColor: theme.card,
        borderRadius:15,
        padding:10,
        elevation:3
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ height:140, borderRadius:10 }}
      />

      <Text style={{ fontWeight:"bold", marginTop:5, color: theme.text }}>
        {item.name}
      </Text>

      <Text style={{ color:"green" }}>
        {formatRupiah(item.price)}
      </Text>

      {/* ICONS */}
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:8
      }}>
        <TouchableOpacity onPress={onCart}>
          <Ionicons name="cart" size={20} color={theme.text}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={onWishlist}>
          <Ionicons name="heart" size={20} color="red"/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}