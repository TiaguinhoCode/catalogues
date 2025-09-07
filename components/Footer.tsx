import { useCart } from "@/provider/CartContext";
import { AntDesign } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, clearCart } = useCart();

  const isCartPage = pathname === "/Cart";

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-between items-center p-5 shadow-lg">
      {/* Home Button */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <AntDesign name="home" size={24} color="black" />
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>

      {/* Favorite Button */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <AntDesign name="hearto" size={24} color="black" />
      </TouchableOpacity>

      {/* Account Button */}
      <TouchableOpacity onPress={() => router.push("/#")}>
        <AntDesign name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
