// Providers
import { useCart } from "@/provider/CartContext";

// Bibliotecas
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import { AddToCartButton } from "@/components/AddToCart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Loading } from "@/components/loading";

// API
import { getProducts } from "@/services/api";

// Icons
import { SimpleProductList } from "@/components/SimpleProductList";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function ProductDetail() {
  const [products, setProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsArray = data.products || data;

        const mapped = productsArray.map((item: any) => ({
          id: item.id,
          name: item.name,
          url_imagem: item.banners?.[0]?.url_imagem || "",
          price: item.price,
          description: item.description,
          stock: item.stock || "Em estoque",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const item = products.find((p) => String(p.id) === String(id));

  if (loading) {
    return <Loading />;
  }

  if (!item) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-700 text-lg">Produto não encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
  };

  const relatedProducts = products.filter((p) => p.id !== item.id);

  return (
    <View className="flex-1 bg-gray-50">
      <Header />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Image
          source={{ uri: item.url_imagem }}
          className="w-[300px] h-[350px] mt-5 self-center rounded-b-3xl"
          resizeMode="cover"
        />

        <View className="p-6 space-y-4">
          <Text className="text-3xl font-bold text-gray-800">{item.name}</Text>
          <Text className="text-3xl font-bold text-green-600 mt-2">
            R$ {item.price.toFixed(2)}
          </Text>

          <View className="mt-5">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Descrição
            </Text>
            <Text className="text-gray-700 text-justify text-lg">
              {item.description}
            </Text>
          </View>

          {/*Vantagens */}
          <View className="mt-5">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Vantagens
            </Text>
            <View className="flex-col gap-3">
              <View className="flex flex-row gap-5 items-center">
                <Feather name="truck" size={22} color="green" />
                <Text className="text-green-600 text-lg font-bold">
                  Frete grátis para todo o Brasil
                </Text>
              </View>
              <View className="flex flex-row gap-5 items-center">
                <Feather name="shield" size={22} color="green" />
                <Text className="text-green-600 text-lg font-bold">
                  Garantia
                </Text>
              </View>
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

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View className="mt-5 mb-32">
              <Text className="text-xl font-bold text-gray-800 mb-5">
                Produtos Relacionados
              </Text>
              <FlatList
                data={relatedProducts}
                horizontal
                renderItem={({ item }) => (
                  <SimpleProductList
                    item={item}
                    style={{ width: 200, height: 300 }}
                  />
                )}
                keyExtractor={(item) => String(item.id)}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-16 left-0 w-full bg-white p-4 border-t border-gray-200 flex-row justify-between items-center shadow-lg">
        {/* Quantity */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-1">
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Text className="text-2xl font-bold">-</Text>
          </TouchableOpacity>

          <Text className="text-lg mx-3 font-bold">{quantity}</Text>

          <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
            <Text className="text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Card */}
        <AddToCartButton
          item={item}
          addToCart={addToCart}
          quantity={quantity}
        />
      </View>

      <Footer />
    </View>
  );
}
