import { useCart } from "@/provider/CartContext";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { desktop } from "../../../data/Products/desktop";
//import { fone } from "../../../data/Products/fone";
//import { laptop } from "../../../data/Products/laptop";

const products = [...desktop]; //...laptop, ...fone

export default function ProductDetail() {
  const { addToCart } = useCart();
  const params = useSearchParams();
  const id = params.get("id");

  const product = products.find((p) => String(p.id) === String(id));

  if (!product)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-700 text-lg">Produto não encontrado</Text>
      </View>
    );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  // Related products (same category)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const [quantity, setQuantity] = useState(1);

  const renderRelated = ({ item }: { item: any }) => (
    <TouchableOpacity className="m-2 p-3 bg-white rounded-2xl shadow-md w-40">
      <Image
        source={item.image}
        className="w-full h-32 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-center font-semibold text-gray-800 mb-1">
        {item.name}
      </Text>
      <Text className="text-center text-green-600 font-bold">
        R$ {item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1"
      >
        {/* Product Image */}
        <Image
          source={product.image}
          className="w-full h-96 mt-5 rounded-b-3xl"
          resizeMode="cover"
        />

        {/* Product Informations */}
        <View className="p-6 space-y-4">
          <Text className="text-3xl font-bold text-gray-800">
            {product.name}
          </Text>

          {/* Price */}
          <Text className="text-3xl font-bold text-green-600 mt-2">
            R$ {product.price.toFixed(2)}
          </Text>

          {/* Stock */}
          {product.stock && (
            <View className="flex-row items-center gap-2 mt-2">
              <View
                className={`w-3 h-3 rounded-full ${
                  product.stock === "Em estoque" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <Text className="text-gray-700 text-lg">{product.stock}</Text>
            </View>
          )}

          {/* Product Sections */}
          <View className="space-y-3 mt-5">
            <View>
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Descrição
              </Text>
              <Text className="text-gray-700 text-justify text-lg">
                {product.description}
              </Text>
            </View>

            {/* Specifications */}
            <View className="mt-5">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Especificações
              </Text>
              <View className="flex flex-col gap-3 bg-white rounded-xl shadow p-4">
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Modelo:
                  </Text>
                  <Text className="text-gray-600">{product.model || "-"}</Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Tela:
                  </Text>
                  <Text className="text-gray-600">
                    {product.display || "-"}
                  </Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Câmera:
                  </Text>
                  <Text className="text-gray-600">{product.camera || "-"}</Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Bateria:
                  </Text>
                  <Text className="text-gray-600">
                    {product.battery || "-"}
                  </Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    SO:
                  </Text>
                  <Text className="text-gray-600">{product.os || "-"}</Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Marca:
                  </Text>
                  <Text className="text-gray-600">{product.brand || "-"}</Text>
                </View>
                <View className="flex-row justify-between pb-2 border-b border-gray-200">
                  <Text className="font-semibold text-gray-700 text-lg">
                    Storage:
                  </Text>
                  <Text className="text-gray-600">
                    {product.storage || "-"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Vantagens */}
            <View className="mt-5">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Vantagens
              </Text>

              <View className="flex-col gap-3">
                {/* Free shipping */}
                <View className="flex flex-row gap-5 items-center">
                  <Feather name="truck" size={22} color="green" />
                  <Text className="text-green-600 text-lg font-bold">
                    Frete grátis para todo o Brasil
                  </Text>
                </View>

                {/* Guarantee */}
                <View className="flex flex-row gap-5 items-center">
                  <Feather name="shield" size={22} color="green" />
                  <Text className="text-green-600 text-lg font-bold">
                    Garantia
                  </Text>
                </View>

                {/* Free Exchange */}
                <View className="flex flex-row gap-5 items-center">
                  <MaterialIcons
                    name="published-with-changes"
                    size={22}
                    color="green"
                  />
                  <Text className="text-green-600 text-lg font-bold">
                    Troca Grátis
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View className="mt-5 mb-32">
              <Text className="text-xl font-bold text-gray-800 mb-5">
                Produtos Relacionados
              </Text>
              <FlatList
                data={relatedProducts}
                renderItem={renderRelated}
                keyExtractor={(item) => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Cart */}
      <View className="absolute bottom-16 left-0 w-full bg-white p-4 border-t border-gray-200 flex-row justify-between items-center shadow-lg">
        {/* Quantity */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-1">
          <TouchableOpacity
            onPress={() => setQuantity((q: number) => Math.max(1, q - 1))}
            className="px-2"
          >
            <Text className="text-2xl font-bold">-</Text>
          </TouchableOpacity>
          <Text className="text-lg mx-3 font-bold">{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity((q: number) => q + 1)}
            className="px-2"
          >
            <Text className="text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-blue-500 px-6 py-3 rounded-full flex-row items-center"
        >
          <AntDesign name="shoppingcart" size={22} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}
