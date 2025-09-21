// Components
import Header from "@/components/Header";
import { Loading } from "@/components/loading";

// API
import {
  formProducts,
  getBrands,
  getCategories,
  getStocks,
} from "@/services/api";

// Bibliotecas
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormState = {
  name: string;
  product_code: string;
  sales_unit: string;
  current_quantity: string;
  minimium_quantity: string;
  price: string;
  purchase_price: string;
  cost_price: string;
  description: string;
  brand_id: string;
  category_id: string;
  stock_id: string;
};

export default function FormProducts() {
  const [form, setForm] = useState<FormState>({
    name: "",
    product_code: "",
    sales_unit: "",
    current_quantity: "",
    minimium_quantity: "",
    price: "",
    purchase_price: "",
    cost_price: "",
    description: "",
    brand_id: "",
    category_id: "",
    stock_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [stocks, setStocks] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, categoriesData, stocksData] = await Promise.all([
          getBrands(),
          getCategories(),
          getStocks(),
        ]);

        const brandsList = Array.isArray(brandsData.brands)
          ? brandsData.brands
          : [];
        const categoriesList = Array.isArray(categoriesData.categories)
          ? categoriesData.categories
          : [];
        const stocksList = Array.isArray(stocksData.stocks)
          ? stocksData.stocks
          : [];

        setBrands(brandsList);
        setCategories(categoriesList);
        setStocks(stocksList);

        console.log("BRANDS:", brandsList);
        console.log("CATEGORIES:", categoriesList);
        console.log("STOCKS:", stocksList);
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados de seleção.");
        setBrands([]);
        setCategories([]);
        setStocks([]);
      }
    };

    fetchData();
  }, []);

  // Atualizar valor do formulário
  const handleChange = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Validação
  const validate = () => {
    if (
      !form.name.trim() ||
      !form.product_code.trim() ||
      !form.sales_unit.trim() ||
      !form.current_quantity.trim() ||
      !form.price.trim() ||
      !form.cost_price.trim()
    ) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos obrigatórios."
      );
      return false;
    }
    return true;
  };

  // Envio do formulário
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await formProducts(form);

      if (data) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        setForm({
          name: "",
          product_code: "",
          sales_unit: "",
          current_quantity: "",
          minimium_quantity: "",
          price: "",
          purchase_price: "",
          cost_price: "",
          description: "",
          brand_id: "",
          category_id: "",
          stock_id: "",
        });
      } else {
        Alert.alert(
          "Erro",
          data?.message || "Não foi possível cadastrar o produto."
        );
      }
    } catch (err) {
      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o produto. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Name */}
        <View className="mb-3">
          <Text className="text-black font-bold mb-1">
            Nome do Produto:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.name}
            placeholder="Digite o nome do produto"
            onChangeText={(t) => handleChange("name", t)}
            className="bg-white text-gray-600 px-4 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Description */}
        <View className="mb-3">
          <Text className="text-black font-bold mb-1">
            Descrição:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.description}
            placeholder="Descrição do produto"
            onChangeText={(t) => handleChange("description", t)}
            className="bg-white text-gray-600 px-4 py-3 rounded-lg border border-gray-200 h-AUTO"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Product Code */}
        <View className="mb-3">
          <Text className="text-black font-bold mb-1">
            Código de Barras:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.product_code}
            placeholder="000000000000000000000"
            onChangeText={(t) => handleChange("product_code", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Sales Unit */}
        <View className="mb-3">
          <Text className="text-black font-bold mb-1">
            Unidade de Venda:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.sales_unit}
            placeholder="un"
            onChangeText={(t) => handleChange("sales_unit", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Current Quantity */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Quantidade Atual:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.current_quantity}
            placeholder="20"
            onChangeText={(t) => handleChange("current_quantity", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Minimium Quantity */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Quantidade Mínima:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.minimium_quantity}
            placeholder="10"
            onChangeText={(t) => handleChange("minimium_quantity", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Price */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Preço:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.price}
            placeholder="R$: 80,00"
            onChangeText={(t) => handleChange("price", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Purchase Price */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Preço de Compra:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.purchase_price}
            placeholder="R$: 80,00"
            onChangeText={(t) => handleChange("purchase_price", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Cost Price */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Preço de Custo:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.cost_price}
            placeholder="R$: 80,00"
            onChangeText={(t) => handleChange("cost_price", t)}
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Stock */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Almoxarifado:
            <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-white border border-gray-200 rounded-lg">
            <Picker
              selectedValue={form.stock_id}
              onValueChange={(value) => handleChange("stock_id", value)}
            >
              <Picker.Item label="Selecione o almoxarifado" value="" />
              {Array.isArray(stocks) &&
                stocks.map((stock) => (
                  <Picker.Item
                    key={stock.id}
                    label={stock.name}
                    value={stock.id}
                  />
                ))}
            </Picker>
          </View>
        </View>

        {/* Brand */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Marca:
            <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-white border border-gray-200 rounded-lg">
            <Picker
              selectedValue={form.brand_id}
              onValueChange={(value) => handleChange("brand_id", value)}
            >
              <Picker.Item label="Selecione a marca" value="" />
              {Array.isArray(brands) &&
                brands.map((brand) => (
                  <Picker.Item
                    key={brand.id}
                    label={brand.name}
                    value={brand.id}
                  />
                ))}
            </Picker>
          </View>
        </View>

        {/* Category */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Categoria:
            <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-white border border-gray-200 rounded-lg">
            <Picker
              selectedValue={form.category_id}
              onValueChange={(value) => handleChange("category_id", value)}
            >
              <Picker.Item label="Selecione a categoria" value="" />
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
            </Picker>
          </View>
        </View>

        {/* Button */}
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            className="bg-blue-600 py-3 my-5 rounded-full items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-lg">Enviar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
