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

export const getAllNotices = async(page = 0, size = 10) => {
    return await axios.get("/posts/notices", {
        params: {size, page},
    });
}

export const getPosts = async(page = 0, size = 10) => {
    return await axios.get("/posts", {
        params: {size, page},
    });
}

export const getUserPosts = async (
    userId,
    page = 0,
    size = 10) => {

    return await axios.get(`/users/${userId}/posts`, {
        params: { size, page },
    });
}

export const getPostsByCategoryAndTags = async (
    userId, categoryId, tags, page = 0, size = 10) => {

    return axios.get(`/users/${userId}/categories/${categoryId}/posts`, {
        params: { tags, page, size },
        paramsSerializer: params =>
            new URLSearchParams(
                Object.entries(params).flatMap(([key, value]) =>
                    Array.isArray(value)
                        ? value.map(v => [key, v])
                        : [[key, value]]
                )
            ).toString()
    });
}