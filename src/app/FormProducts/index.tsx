// Components
import Header from "@/components/Header";
import { Loading } from "@/components/loading";

// API
import {
  formProducts,
  getBrands,
  getCategories,
  getWarehouses,
} from "@/services/api";

// Bibliotecas
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  current_quantity: number;
  minimium_quantity: number;
  maximum_quantity: number;
  price: number;
  purchase_price: number;
  cost_price: number;
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
    current_quantity: 0,
    minimium_quantity: 0,
    maximum_quantity: 0,
    price: 0,
    purchase_price: 0,
    cost_price: 0,
    description: "",
    brand_id: "",
    category_id: "",
    stock_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  // Change handler
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          getBrands(),
          getCategories(),
        ]);

        setBrands(Array.isArray(brandsData.brands) ? brandsData.brands : []);
        setCategories(
          Array.isArray(categoriesData.categories)
            ? categoriesData.categories
            : []
        );

        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Erro", "Token de autenticação não encontrado.");
          return;
        }

        const warehouseData = await getWarehouses(token);
        setWarehouses(Array.isArray(warehouseData) ? warehouseData : []);
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados de seleção.");
        setBrands([]);
        setCategories([]);
        setWarehouses([]);
      }
    };

    fetchData();
  }, []);

  // Validação
  const validate = () => {
    if (
      !form.name.trim() ||
      !form.product_code.trim() ||
      !form.sales_unit.trim() ||
      !form.current_quantity ||
      !form.price ||
      !form.cost_price
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

      console.log("DATA:", data);
      if (data) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        setForm({
          name: "",
          product_code: "",
          sales_unit: "",
          current_quantity: 0,
          minimium_quantity: 0,
          maximum_quantity: 0,
          price: 0,
          purchase_price: 0,
          cost_price: 0,
          description: "",
          brand_id: "",
          category_id: "",
          stock_id: "",
        });
      } else {
        Alert.alert("Erro", data?.message);
        console.log("SETORM:", setForm);
      }
    } catch (err: any) {
      console.log("ERR:", err);

      Alert.alert("Erro", err?.response?.data?.message || err?.message);
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
            value={form.current_quantity.toString()}
            placeholder="20"
            onChangeText={(t) =>
              handleChange("current_quantity", parseFloat(t) || 0)
            }
            keyboardType="numeric"
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
            value={form.minimium_quantity.toString()}
            placeholder="10"
            onChangeText={(t) =>
              handleChange("minimium_quantity", parseFloat(t) || 0)
            }
            keyboardType="numeric"
            className="bg-white px-4 text-gray-600 py-3 rounded-lg border border-gray-200"
          />
        </View>

        {/* Maximum Quantity */}
        <View className="mb-4">
          <Text className="text-black font-bold mb-1">
            Quantidade Máxima:
            <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.maximum_quantity.toString()}
            placeholder="10"
            onChangeText={(t) =>
              handleChange("maximum_quantity", parseFloat(t) || 0)
            }
            keyboardType="numeric"
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
            value={form.price.toString()}
            placeholder="R$: 80,00"
            onChangeText={(t) => handleChange("price", parseFloat(t) || 0)}
            keyboardType="numeric"
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
            value={form.purchase_price.toString()}
            placeholder="R$: 80,00"
            onChangeText={(t) =>
              handleChange("purchase_price", parseFloat(t) || 0)
            }
            keyboardType="numeric"
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
            value={form.cost_price.toString()}
            placeholder="R$: 80,00"
            onChangeText={(t) => handleChange("cost_price", parseFloat(t) || 0)}
            keyboardType="numeric"
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
              {Array.isArray(warehouses) &&
                warehouses.map((warehouses) => (
                  <Picker.Item
                    key={warehouses.id}
                    label={warehouses.name}
                    value={warehouses.id}
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
