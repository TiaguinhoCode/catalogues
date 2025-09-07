import Footer from "@/components/Footer";
import { useCart } from "@/provider/CartContext";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center bg-white rounded-2xl p-4 mt-4 shadow">
      <Image
        source={item.image}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />

      <View className="flex-1 ml-4">
        <Text className="text-gray-800 font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-500 mt-1">
          R$ {item.price.toFixed(2)} x {item.quantity}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        className="ml-2"
      >
        <Feather name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center p-5 bg-white shadow-md">
        <Text className="text-3xl font-bold text-gray-800">Carrinho</Text>
        {cart.length > 0 && (
          <TouchableOpacity
            onPress={clearCart}
            className="flex-row items-center justify-center bg-red-500 p-2 w-28 rounded-full"
          >
            <Text className="text-white font-semibold">Apagar tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length === 0 ? (
        <Text className="text-gray-500 text-center mt-8 text-lg">
          Seu carrinho está vazio.
        </Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 150,
            }}
            showsVerticalScrollIndicator={false}
          />

          {/* Footer com Total e Finalizar Compra */}
          <View className="absolute bottom-16 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-800 font-bold text-lg">Total</Text>
              <Text className="text-gray-800 font-bold text-lg">
                R$ {total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity className="bg-blue-500 py-3 rounded-full items-center">
              <Text className="text-white font-bold text-lg">
                Finalizar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Footer fixo do app */}
      <Footer />
    </View>
  );
}
