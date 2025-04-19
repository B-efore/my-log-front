import axios from "./axios"

export const createComment = async (commentData) => {
    return axios.post("/comments", commentData);
};