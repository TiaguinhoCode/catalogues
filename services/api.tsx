import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://kamala-driveable-overfavorably.ngrok-free.dev/v1",
});

// Interceptor para colocar o token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Produtos
export const getProducts = async () => {
  const response = await api.get("/products?limit=100");
  return response.data;
};

// Signin
export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/signin/", { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Brands
export const getBrands = async () => {
  const response = await api.get("/brands/");
  if (!response) throw new Error("Erro ao buscar brands");

  return response.data; // array de marcas
};

// Categories
export const getCategories = async () => {
  const response = await api.get("/categories/");
  if (!response) throw new Error("Erro ao buscar categorias");
  return response.data; // array de categorias
};

// Stocks
export const getWarehouses = async (token: string) => {
  const response = await api.get("/warehouses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) throw new Error("Erro ao buscar estoque");

  return response.data.warehouses; // array de almoxarifados
};

// Form Product
export const formProducts = async (formData: any) => {
  console.log("FORMDATA:", JSON.stringify(formData, null, 2));
  try {
    const response = await api.post("/stocks", formData);
    console.log("RESPONSE:", response.data);
    return response.data;
  } catch (err: any) {
    console.log("ERROR API:", err?.response?.data || err);
    throw err;
  }
};
