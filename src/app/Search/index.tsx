// Components
import { categoryMap } from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Loading } from "@/components/loading";
import { ProductList } from "@/components/ProductList";

// Icons
import { Feather } from "@expo/vector-icons";

// Bibliotecas
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

// Services
import { getProducts } from "../../../services/api";

export default function Search() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Seach products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header />

      {/* Search Field */}
      <TextInput
        className="bg-gray-100 p-3 rounded-lg border border-gray-300 my-5 mx-5"
        placeholder="Digite para pesquisar..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Selector */}
      <View className="bg-gray-100 border border-gray-300 rounded-lg mb-5 mx-5">
        <View className="flex-row items-center px-3 py-2 border-b border-gray-300 bg-gray-200 rounded-t-lg">
          <Feather name="filter" size={18} color="#374151" />
          <Text className="ml-2 text-gray-700 font-semibold">Filtro</Text>
        </View>

        <Picker
          selectedValue={filter}
          onValueChange={(value) => setFilter(value)}
        >
          {Object.keys(categoryMap).map((key) => (
            <Picker.Item key={key} label={key} value={categoryMap[key]} />
          ))}
        </Picker>
      </View>

      {/* Product List */}
      <ProductList filteredProducts={filteredProducts} />

      <Footer />
    </View>
  );
}
