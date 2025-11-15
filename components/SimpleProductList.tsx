// Bibliotecas
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Provider
import { useCart } from "@/provider/CartContext";

// Components
import { AddToCartButton } from "./AddToCart";

// Routes
import { router } from "expo-router";

// Type
type SimpleProductListProps = {
  item: any;
  style?: object;
};

export const SimpleProductList: React.FC<SimpleProductListProps> = ({
  item,
  style,
}) => {
  const { cart, addToCart } = useCart();

  const imageUrl = item.url_imagem || item.banners?.[0]?.url_imagem;

  return (
    <TouchableOpacity
      style={style}
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
          source={{ uri: imageUrl }}
          className="w-[150px] h-[150px] self-center"
          resizeMode="contain" // mantém proporção da imagem
        />

        {/* Product Name */}
        <Text className="text-lg font-bold text-center mb-1 text-gray-800">
          {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
        </Text>

        {/* Price */}
        <Text className="text-green-600 text-lg font-bold text-center mb-2">
          R$ {item.price.toFixed(2)}
        </Text>

        {/* Buy Button */}
        <AddToCartButton item={item} addToCart={addToCart} quantity={1} />
      </View>
    </TouchableOpacity>
  );
};
