// Provider
import { CartProvider } from "@/provider/CartContext";

// CSS
import "../styles/global.css";

// Expo
import { Slot } from "expo-router";

// React native
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar backgroundColor="#1465D1" barStyle="light-content" />
      <Slot />
    </CartProvider>
  );
}
