import axios from "./axios";

export const helloAdmin = async () => {
    return axios.get("/admin/hello", );
};

export const createNotice = async (request) => {
    return axios.post("/admin/notices", request);
}

export const updateNotice = async (postId, request) => {
    return axios.patch(`/admin/notices/${postId}`, request);
}