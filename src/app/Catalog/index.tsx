// Bibliotecas
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Datas
import { desktop } from "../../../data/Products/desktop";
import { fone } from "../../../data/Products/fone";
import { laptop } from "../../../data/Products/laptop";

// Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SimpleProductList } from "@/components/SimpleProductList";

const products = [...desktop, ...laptop, ...fone];

const categoryMap: Record<string, string> = {
  Todos: "all",
  Computador: "desktop",
  Notebook: "laptop",
  Fone: "fone",
  Monitor: "monitor",
  Câmera: "camera",
  TV: "tv",
  Som: "sound",
};

const categories = Object.keys(categoryMap);

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("desktop");

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <View className="flex-1 bg-gray-50">
      <Header />

      {/* Category Menu */}
      <View className="m-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelectedCategory(categoryMap[item])}
              className={`mr-3 px-5 py-2 rounded-full shadow-sm ${
                selectedCategory === categoryMap[item]
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedCategory === categoryMap[item]
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        className="mb-20"
        data={filteredProducts}
        renderItem={({ item }) => <SimpleProductList item={item} />}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-gray-800 m-2">
            Produtos em Destaque
          </Text>
        }
      />

      <Footer />
    </View>
  );
}
