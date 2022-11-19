import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:3001/products",
});

export const getProducts = async () => {
  const res = await productApi.get("/");
  return res.data;
};

export const addProduct = async (product) => {
  return await productApi.post("/", product);
};

export const removeProduct = async (id) => {
  return await productApi.delete(`/${id}`);
}

export const changeStock = async (product) => {
  return await productApi.put(`/${product.id}`, product);
}