import React, { createContext, useState } from "react";
import Toast from "react-native-toast-message";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  qty: number;
};

type HistoryItem = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);

      if (exist) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    Toast.show({
      type: "success",
      text1: "Added to Cart 🛒",
    });
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === product.id)) return prev;

      Toast.show({
        type: "success",
        text1: "Added to Wishlist ❤️",
      });

      return [...prev, product];
    });
  };

  const checkout = () => {
    setHistory(prevHistory => {
      if (cart.length === 0) return prevHistory;

      const id = generateID();
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const date = new Date().toLocaleString();

      return [...prevHistory, { id, items: cart, total, date }];
    });

    setCart([]);

    Toast.show({
      type: "success",
      text1: "Checkout Success 🎉",
    });
  };

  const generateID = () => {
    const letters = "ABCDEF";
    const numbers = "0123456789";

    return (
      letters[Math.floor(Math.random()*6)] +
      letters[Math.floor(Math.random()*6)] +
      letters[Math.floor(Math.random()*6)] +
      numbers[Math.floor(Math.random()*10)] +
      numbers[Math.floor(Math.random()*10)] +
      numbers[Math.floor(Math.random()*10)]
    );
  };

  return (
    <AppContext.Provider value={{
      cart, wishlist, history, darkMode,
      setCart, setWishlist, setDarkMode,
      addToCart, addToWishlist, checkout
    }}>
      {children}
    </AppContext.Provider>
  );
};