import axios from "./axios"

export const createPost = async (postData) => {
    return axios.post("/posts", postData);
};