import axios from "./axios"

export const createItem = async (data) => {
    return axios.post("/admin/items", data);
};

export const updateItem = async (itemId, data) => {
    return axios.patch(`/admin/items/${itemId}`, data);
};

export const deleteItem = async (itemId) => {
    return axios.delete(`/admin/items/${itemId}`);
};