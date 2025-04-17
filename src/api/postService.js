import axios from "./axios"

export const createPost = async (postData) => {
    return axios.post("/posts", postData);
};

export const updatePost = async (postId, postData) => {
    return axios.patch(`/posts/${postId}`, postData);
}

export const getPost = async (postId) => {
    return axios.get(`/posts/${postId}`);
}

export const deletePost = async (postId) => {
    return axios.delete(`/posts/${postId}`);
}