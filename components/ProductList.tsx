// Components
import { SimpleProductList } from "@/components/SimpleProductList";

// Bibliotecas
import { usePathname } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";

type ProductListProps = {
  filteredProducts: any[];
};

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
}) => {
  const pathname = usePathname();

  // Change the title
  const headerTitle =
    pathname === "/Search" ? "Resultados da Busca" : "Produtos em Destaque";

  return (
    <FlatList
      className="mb-14"
      data={filteredProducts}
      renderItem={({ item }) => <SimpleProductList item={item} />}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text className="text-2xl font-bold text-gray-800 m-2">
          {headerTitle}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-center text-gray-500 mt-10">
          Nenhum produto encontrado.
        </Text>
      }
    />
  );
};
