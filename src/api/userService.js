import axios from "./axios";

export const updateMyInfo = async (request) => {
    return await axios.patch("/users/me", request);
}

export const getMyInfo = async () => {
    return await axios.get("/users/me");
}

export const getUser = async (userId) => {
    return await axios.get(`/users/${userId}`);
}