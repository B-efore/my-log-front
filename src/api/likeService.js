import axios from "./axios"

export const getLikeCount = async(postId) => {
    return axios.get(`/posts/${postId}/likes/count`);
}

export const getLikeStatus = async(postId) => {
    return axios.get(`/posts/${postId}/likes`);
}

export const createLike = async(postId) => {
    return axios.post(`/posts/${postId}/likes`);
}

export const deleteLike = async(postId) => {
    return axios.delete(`/posts/${postId}/likes`);
}