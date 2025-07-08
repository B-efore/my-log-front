import axios from "./axios"

export const createComment = async (postId, commentData) => {
    return axios.post(`/posts/${postId}/comments`, commentData);
};

export const updateComment = async (postId, commentId, commentData) => {
    return axios.patch(`/posts/${postId}/comments/${commentId}`, commentData);
};

export const deleteComment = async (postId, commentId) => {
    return axios.delete(`/posts/${postId}/comments/${commentId}`);
};