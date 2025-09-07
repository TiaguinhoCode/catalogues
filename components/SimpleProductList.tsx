// Bibliotecas
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Provider
import { useCart } from "@/provider/CartContext";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Routes
import { router } from "expo-router";

export const SimpleProductList = ({ item }: { item: any }) => {
  const { cart, addToCart } = useCart();

  return (
    <TouchableOpacity
      className="flex-1 m-2 p-5 bg-white rounded-2xl shadow-lg"
      onPress={() =>
        router.push({
          pathname: "/ProductDetail",
          params: { id: String(item.id) },
        })
      }
    >
      <View>
        {/* Product Image */}
        <Image
          source={item.image}
          className="w-28 h-28 self-center rounded-xl mb-4"
          resizeMode="cover"
        />

        {/* Favorite Icon */}
        <TouchableOpacity
          className="absolute top-1 right-1 bg-white p-2 rounded-full shadow"
          onPress={() => console.log("Favoritar", item.name)}
        >
          <AntDesign name="hearto" size={18} color="black" />
        </TouchableOpacity>

        {/* Product Name */}
        <Text className="text-lg font-bold text-center mb-1 text-gray-800">
          {item.name}
        </Text>

        {/* Price */}
        <Text className="text-green-600 text-lg font-bold text-center mb-2">
          R$ {item.price.toFixed(2)}
        </Text>

        <View className="flex flex-row justify-between items-center">
          {/* Stock */}
          {item.stock !== undefined && (
            <View className="flex-row items-center gap-2">
              {/* Dots */}
              <View
                className={`w-2 h-2 rounded-full ${
                  item.stock === "Em estoque" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {/* Text */}
              <Text className="text-gray-600 text-sm">{item.stock}</Text>
            </View>
          )}

          {/* Buy Botton */}
          <TouchableOpacity
            className={`p-2 rounded-full shadow flex-row ${
              item.stock === "Sem estoque" ? "bg-gray-400" : "bg-blue-500"
            }`}
            onPress={() => addToCart(item)}
            disabled={item.stock === "Sem estoque"}
          >
            <AntDesign name="shoppingcart" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
