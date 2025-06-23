import axios from "./axios";

export const getCategories = async (userId) => {
  const res = await axios.get(`/users/${userId}/categories`);
  const categories = res.data?.categories || [];

  return [
    { categoryId: 0, name: '없음'},
    ...categories
  ];
};

export const getCategoriesWithCount = async (userId) => {
  return await axios.get(`/users/${userId}/categories/with-counts`);
}

export const createCategory = async (categoryRequest) => {
  return axios.post("/categories", categoryRequest);
}