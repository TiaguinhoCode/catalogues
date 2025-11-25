import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type AddToCartButtonProps = {
  item: any;
  addToCart: (product: any, quantity?: number) => void;
  quantity?: number;
  onAdded?: (nextQuantity: number) => void;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  addToCart,
  quantity = 1,
  onAdded,
}) => {
  return (
    <TouchableOpacity
      className={`flex justify-center gap-2 py-2 px-5 rounded-full shadow flex-row ${
        item.stock === "Sem estoque" ? "bg-gray-400" : "bg-blue-500"
      }`}
      onPress={() => {
        addToCart(item, quantity);
        onAdded?.(quantity + 1);
      }}
      disabled={item.stock === "Sem estoque"}
    >
      <Feather name="shopping-cart" size={18} color="white" />
      <Text className="text-white font-bold">Adicionar</Text>
    </TouchableOpacity>
  );
};
