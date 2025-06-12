import axios from "./axios";

export const getCategories = async (userId) => {
  const res = await axios.get(`/users/${userId}/categories`);
  return res.data?.categories || [];
};

export const createCategory = async (categoryRequest) => {
  return axios.post("/categories", categoryRequest);
}