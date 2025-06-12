import axios from "./axios"

export const getAllTags = async (userId) => {
    return axios.get(`/users/${userId}/tags`);
};