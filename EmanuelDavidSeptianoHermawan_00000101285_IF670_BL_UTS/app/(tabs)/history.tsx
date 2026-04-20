import { useState, useContext } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "expo-router";
import useTheme from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import Screen from "@/components/Screen";

type CartItem = {
  id: string;
  image: string;
};

type HistoryItem = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

export default function History() {
  const { history } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const router = useRouter();

  const filtered = history.filter((h: HistoryItem) =>
    h.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Screen style={{ flex:1, backgroundColor: theme.bg }}>

      {/* 🔥 HEADER TITLE */}
      <Text style={{
        fontSize:22,
        fontWeight:"bold",
        marginHorizontal:15,
        marginTop:5,
        color: "gray"
      }}>
        Transaction History
      </Text>

      {/* 🔍 SEARCH */}
      <View style={{
        margin:15,
        backgroundColor: theme.card,
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:15,
        elevation:2
      }}>
        <Ionicons name="search" size={18} color={theme.sub}/>
        <TextInput
          placeholder="Search transaction..."
          placeholderTextColor={theme.sub}
          value={search}
          onChangeText={setSearch}
          style={{
            flex:1,
            padding:12,
            color: theme.text
          }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item: HistoryItem) => item.id}
        contentContainerStyle={{ padding:15 }}

        ListEmptyComponent={
          <View style={{ alignItems:"center", marginTop:100 }}>
            <Ionicons name="cart-outline" size={80} color={theme.sub}/>
            <Text style={{ marginTop:10, fontSize:16, color: theme.sub }}>
              No transactions yet
            </Text>
          </View>
        }

        renderItem={({ item }: { item: HistoryItem }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/history-detail",
                params: { data: JSON.stringify(item) }
              })
            }
          >
            <View style={{
              backgroundColor: theme.card,
              borderRadius:25,
              padding:15,
              marginBottom:20,
              elevation:5
            }}>

              {/* 🔥 TOP */}
              <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center"
              }}>
                <Text style={{
                  fontWeight:"bold",
                  fontSize:16,
                  color: theme.text
                }}>
                  Order #{item.id}
                </Text>

                <View style={{
                  flexDirection:"row",
                  alignItems:"center",
                  backgroundColor:"rgba(0,200,0,0.15)",
                  paddingHorizontal:10,
                  paddingVertical:4,
                  borderRadius:15
                }}>
                  <Ionicons name="checkmark-circle" size={14} color="green"/>
                  <Text style={{ marginLeft:5, color:"green", fontSize:12 }}>
                    Paid
                  </Text>
                </View>
              </View>

              {/* DATE */}
              <Text style={{
                fontSize:12,
                color: theme.sub,
                marginTop:5
              }}>
                {item.date}
              </Text>

              {/* 🔥 DIVIDER */}
              <View style={{
                height:1,
                backgroundColor: theme.bg,
                marginVertical:12
              }}/>

              {/* 🔥 PRODUCT PREVIEW */}
              <View style={{
                flexDirection:"row",
                alignItems:"center"
              }}>
                {item.items.slice(0,3).map((i: CartItem) => (
                  <Image
                    key={i.id}
                    source={{ uri: i.image }}
                    style={{
                      width:50,
                      height:50,
                      borderRadius:12,
                      marginRight:8
                    }}
                  />
                ))}

                {item.items.length > 3 && (
                  <View style={{
                    width:50,
                    height:50,
                    borderRadius:12,
                    backgroundColor: theme.bg,
                    justifyContent:"center",
                    alignItems:"center"
                  }}>
                    <Text style={{ color: theme.text }}>
                      +{item.items.length - 3}
                    </Text>
                  </View>
                )}
              </View>

              {/* 🔥 FOOTER */}
              <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginTop:15
              }}>
                <Text style={{ color: theme.sub }}>
                  {item.items.length} items
                </Text>

                <Text style={{
                  fontSize:18,
                  fontWeight:"bold",
                  color:"#4facfe"
                }}>
                  Rp {item.total.toLocaleString()}
                </Text>
              </View>

              {/* 🔥 CTA */}
              <View style={{
                marginTop:12,
                backgroundColor:"#4facfe",
                paddingVertical:8,
                borderRadius:10,
                alignItems:"center"
              }}>
                <Text style={{ color:"#fff", fontWeight:"bold" }}>
                  View Details
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}