import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/constants/useTheme";

type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type HistoryData = {
  id: string;
  items: Item[];
  total: number;
  date: string;
};

export default function Detail() {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();

  let parsed: HistoryData | null = null;

  try {
    parsed = data ? JSON.parse(data as string) : null;
  } catch (e) {
    console.log("Parse error:", e);
  }

  if (!parsed) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor: theme.bg }}>

      {/* 🔥 HEADER */}
      <View style={{
        paddingTop:50,
        paddingBottom:20,
        paddingHorizontal:15,
        backgroundColor:"#4facfe",
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff"/>
        </TouchableOpacity>

        <Text style={{
          color:"#fff",
          fontSize:20,
          fontWeight:"bold",
          marginTop:10
        }}>
          Transaction Detail
        </Text>

        <Text style={{ color:"#e0f7ff", marginTop:5 }}>
          #{parsed.id}
        </Text>
      </View>

      {/* 🔥 INFO CARD */}
      <View style={{
        backgroundColor: theme.card,
        margin:15,
        padding:15,
        borderRadius:15,
        elevation:3
      }}>
        <Text style={{ color: theme.sub }}>
          Date
        </Text>
        <Text style={{
          fontWeight:"bold",
          color: theme.text,
          marginTop:3
        }}>
          {parsed.date}
        </Text>

        <View style={{
          flexDirection:"row",
          alignItems:"center",
          marginTop:8
        }}>
          <Ionicons name="checkmark-circle" size={18} color="green"/>
          <Text style={{ color:"green", marginLeft:5 }}>
            Payment Success
          </Text>
        </View>
      </View>

      {/* 🔥 LIST PRODUCT */}
      <FlatList
        data={parsed.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal:15, paddingBottom:120 }}

        renderItem={({ item }) => (
          <View style={{
            backgroundColor: theme.card,
            borderRadius:15,
            padding:10,
            marginBottom:10,
            flexDirection:"row",
            alignItems:"center",
            elevation:2
          }}>

            {/* IMAGE */}
            <Image
              source={{ uri: item.image }}
              style={{ width:65, height:65, borderRadius:10 }}
            />

            {/* INFO */}
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={{
                fontWeight:"bold",
                color: theme.text
              }}>
                {item.name}
              </Text>

              <Text style={{ color: theme.sub, marginTop:3 }}>
                Qty: {item.qty}
              </Text>

              <Text style={{ color:"#4facfe", marginTop:3 }}>
                Rp {(item.price * item.qty).toLocaleString()}
              </Text>
            </View>

          </View>
        )}
      />

      {/* 🔥 TOTAL BAR */}
      <View style={{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        backgroundColor: theme.card,
        padding:15,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        elevation:10
      }}>
        <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <Text style={{ fontSize:16, color: theme.text }}>
            Total Payment
          </Text>

          <Text style={{
            fontSize:18,
            fontWeight:"bold",
            color:"#4facfe"
          }}>
            Rp {parsed.total.toLocaleString()}
          </Text>
        </View>
      </View>

    </View>
  );
}