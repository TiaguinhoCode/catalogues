import axios from "axios";

const api = axios.create({
  baseURL: "https://catalogsapi.vercel.app/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4ZjRkMThhLTJlNjgtNDllOC1iNDA4LTkxZTJiNDU2ZjAyNyIsIm5hbWUiOiJMb2dpY0h1YiIsInN1cm5hbWUiOiJTdXBvcnRlIiwicGhvbmUiOiIoODUpIDk4NzgwLTU1OTIiLCJlbWFpbCI6InRpYWdvcmFmYWVsMDE5QGdtYWlsLmNvbSIsImNlcCI6IjYwMzEwLTM0MCIsInBob3RvIjpudWxsLCJpc19hY3RpdmUiOnRydWUsImNoZWNrZWQiOnRydWUsImVudGVycHJpc2UiOm51bGwsInJ1bGUiOnsiaWQiOiJlNTMyYWIwYy01MTEyLTQ5ZTItYjlkNC1lZTBjYzUwMGI5MzEiLCJuYW1lIjoiU3Vwb3J0ZSBkbyBTaXN0ZW1hIn0sInZhbGlkYXRpb25faWQiOiIyNGRiZTAzNy0zYTQyLTQ1ZWYtYWUxYi1hMmYxMDM3ODNjNTkiLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNVQxMjoyMzoxNS45MjFaIiwidXBkYXRlZF9hdCI6IjIwMjUtMDgtMDVUMTc6MTM6MDEuNDgyWiIsImlhdCI6MTc1ODQ4NTg0NCwiZXhwIjoxNzYxMDc3ODQ0fQ.6IpTtk5u1eP_Y0sXOpNpL62RAmqdhw464k5CNEUO7Ug",
  },
});

// Produtos
export const getProducts = async () => {
  const response = await api.get("/products/");
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
  const response = await api.post("/stocks", formData);
  return response.data; // aqui deve vir { success: true, message: "..."}
};
