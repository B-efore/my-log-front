import axios from "./axios"

export const createComment = async (commentData) => {
    return axios.post("/comments", commentData);
};

export const updateComment = async (commentId, commentData) => {
    return axios.patch(`/comments/${commentId}`, commentData);
};

export const deleteComment = async (commentId) => {
    return axios.delete(`/comments/${commentId}`);
};