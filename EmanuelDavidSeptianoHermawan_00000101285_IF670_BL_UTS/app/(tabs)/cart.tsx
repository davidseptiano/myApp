import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { formatRupiah } from "@/constants/format";
import useTheme from "@/constants/useTheme";
import Screen from "@/components/Screen";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function Cart() {
  const { cart, setCart, checkout } = useContext(AppContext);
  const theme = useTheme();

  const total = cart.reduce((s: number, i: CartItem) => 
    s + i.price * i.qty, 0
  );

  const increaseQty = (item: CartItem) => {
    setCart(cart.map((c: CartItem) =>
      c.id === item.id ? { ...c, qty: c.qty + 1 } : c
    ));
  };

  const decreaseQty = (item: CartItem) => {
    if (item.qty === 1) {
      setCart(cart.filter((c: CartItem) => c.id !== item.id));
    } else {
      setCart(cart.map((c: CartItem) =>
        c.id === item.id ? { ...c, qty: c.qty - 1 } : c
      ));
    }
  };

  return (
    <Screen style={{ backgroundColor:"#f5f5f5" }}>
      
      {/* LIST */}
      <FlatList
        data={cart}
        keyExtractor={(item: CartItem) => item.id}
        contentContainerStyle={{ padding:10 }}
        ListEmptyComponent={
          <Text style={{ textAlign:"center", marginTop:50, color:"gray" }}>
            Cart is empty 🛒
          </Text>
        }
        renderItem={({ item }: { item: CartItem }) => (
          
          <View style={{
            backgroundColor:"#fff",
            borderRadius:15,
            padding:10,
            marginBottom:10,
            flexDirection:"row",
            alignItems:"center",
            elevation:3
          }}>
            
            {/* IMAGE */}
            <Image
              source={{ uri: item.image }}
              style={{ width:70, height:70, borderRadius:10 }}
            />

            {/* INFO */}
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={{ fontWeight:"bold" }}>
                {item.name}
              </Text>

              <Text style={{ color:"green", marginTop:5 }}>
                {formatRupiah(item.price)}
              </Text>

              {/* QTY CONTROL */}
              <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginTop:8
              }}>
                
                <TouchableOpacity
                  onPress={() => decreaseQty(item)}
                  style={{
                    backgroundColor:"#eee",
                    padding:6,
                    borderRadius:6
                  }}
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>

                <Text style={{ marginHorizontal:10 }}>
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() => increaseQty(item)}
                  style={{
                    backgroundColor:"#4facfe",
                    padding:6,
                    borderRadius:6
                  }}
                >
                  <Ionicons name="add" size={16} color="#fff"/>
                </TouchableOpacity>

              </View>
            </View>

            {/* SUBTOTAL */}
            <Text style={{
              fontWeight:"bold",
              color:"black"
            }}>
              {formatRupiah(item.price * item.qty)}
            </Text>

          </View>
        )}
      />

      {/* TOTAL BAR */}
      {cart.length > 0 && (
        <View style={{
          backgroundColor:"#fff",
          padding:15,
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          elevation:10
        }}>
          
          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginBottom:10
          }}>
            <Text style={{ fontSize:16 }}>Total</Text>
            <Text style={{ fontSize:18, fontWeight:"bold", color:"green" }}>
              {formatRupiah(total)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={checkout}
            style={{
              backgroundColor:"#4facfe",
              padding:15,
              borderRadius:10,
              alignItems:"center"
            }}
          >
            <Text style={{ color:"#fff", fontWeight:"bold" }}>
              Checkout
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </Screen>
  );
}