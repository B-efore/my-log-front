import axios from "./axios"

export const getAllTags = async (userId) => {
    return axios.get(`/users/${userId}/tags`);
};

export const getAllTagsWithCount = async (userId, page = 0, size = 10) => {
    return axios.get(`/users/${userId}/tags/with-counts`, { 
        params: { page, size }}
    );
}