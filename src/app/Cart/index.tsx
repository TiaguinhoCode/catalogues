// Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Providers
import { useCart } from "@/provider/CartContext";

// Icons
import { Feather } from "@expo/vector-icons";

// Bibliotecas
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center bg-white rounded-2xl p-4 mt-4 shadow">
      <Image
        source={{ uri: item.url_imagem }}
        className="w-[70px] h-[80px] rounded-xl"
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

  const phoneNumber = "+5585999063736";

  return (
    <View className="flex-1 bg-gray-50">
      <Header />

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

          {/* Footer with total and final purchase */}
          <View className="absolute bottom-16 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-800 font-bold text-lg">Total</Text>
              <Text className="text-gray-800 font-bold text-lg">
                R$ {total.toFixed(2)}
              </Text>
            </View>

            {/* Complete the Purchase */}
            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-full items-center"
              onPress={() => {
                // Show cart product list
                const produtos = cart
                  .map(
                    (item) =>
                      `• ${item.name} (Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`
                  )
                  .join("\n");

                // Final message
                const mensagem = `Olá, quero finalizar a compra com os seguintes produtos:\n\n${produtos}\n\n💰 Total: R$ ${total.toFixed(2)}`;

                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;

                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    alert(
                      "Não foi possível abrir o WhatsApp para finalizar a compra. Por gentileza, entre em contato com o desenvolvedor."
                    );
                  }
                });
              }}
            >
              <Text className="text-white font-bold text-lg">
                Finalizar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Footer */}
      <Footer />
    </View>
  );
}
