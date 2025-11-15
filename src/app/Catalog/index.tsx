import { categories, categoryMap } from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Loading } from "@/components/loading";
import { ProductList } from "@/components/ProductList";
import { getProducts } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const mapped = (data.products || data).map((item: any) => ({
          id: item.id,
          name:
            item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
          url_imagem: item.banners?.[0]?.url_imagem || "",
          price: item.price,
          category: item.category,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

      {loading ? (
        <Loading />
      ) : (
        <ProductList filteredProducts={filteredProducts} />
      )}

      <Footer />
    </View>
  );
}
