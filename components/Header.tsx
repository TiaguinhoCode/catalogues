import { useCart } from "@/provider/CartContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  customTitle?: string;
  hideBackButton?: boolean;
}

export default function Header({ customTitle, hideBackButton }: HeaderProps) {
  const { cart } = useCart();

  return (
    <View className="flex-row justify-between items-center p-5 bg-white shadow-md">
      {/* Title */}
      <View className="flex gap-1">
        <Text className="text-3xl font-bold text-gray-800">Cataloguês</Text>
        <Text className="text-gray-600">Catálogo de Eletrônicos</Text>
      </View>

      {/* Cart Button */}
      <TouchableOpacity onPress={() => router.push("/Cart")}>
        <AntDesign name="shoppingcart" size={24} color="black" />
        {cart.length > 0 && (
          <View className=" -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            <Text className="text-white text-xs font-bold">{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
