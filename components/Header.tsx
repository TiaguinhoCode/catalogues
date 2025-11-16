// Provider
import { useCart } from "@/provider/CartContext";

// Icons
import { Feather } from "@expo/vector-icons";

// Routes
import { router, usePathname } from "expo-router";

// Bibliotecas
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname(); // Get current route

  const headers: Record<string, { title: string; subTitle?: string }> = {
    "/Catalog": { title: "Cataloguês", subTitle: "Catálogo de Eletrônicos" },
    "/FormProducts": {
      title: "Cadastro de Estoque",
      subTitle: "Área Administrativa",
    },
    "/ProductDetail": { title: "Informações" },
    "/Search": { title: "Buscar Produto" },
    "/Cart": { title: "Carrinho" },
  };

  const { title, subTitle } = headers[pathname] || { title: "Cataloguês" };

  // Defines whether to show subtitle and cart
  const showTitleAndSubTitle =
    pathname === "/Catalog" || pathname === "/FormProducts";
  const showTitle =
    pathname === "/Cart" ||
    pathname === "/Search" ||
    pathname === "/ProductDetail";
  const showCartIcon = pathname !== "/Cart" && pathname !== "/FormProducts";

  return (
    <View className="flex-row justify-between items-center p-5 bg-white shadow-md">
      {/* Title and Subtitle*/}
      {showTitleAndSubTitle && (
        <View className="flex gap-1">
          <Text className="text-3xl font-bold text-gray-800">{title}</Text>
          <Text className="text-gray-500 text-sm">{subTitle}</Text>
        </View>
      )}

      {/* Title */}
      {showTitle && (
        <View className="flex gap-1">
          <Text className="text-3xl font-bold text-gray-800">{title}</Text>
        </View>
      )}

      {/* Cart Button */}
      {showCartIcon && (
        <TouchableOpacity
          onPress={() => router.push("/Cart")}
          className="relative p-2"
        >
          <Feather name="shopping-cart" size={24} color="#1F2937" />

          {/* Badge */}
          {cart.length > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {cart.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
