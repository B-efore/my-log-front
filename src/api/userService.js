import axios from "./axios";

// 유저 프로필
export const getMyProfile = async () => {
    return await axios.get("/users/me");
}

export const updateMyProfile = async (request) => {
    return await axios.patch("/users/me", request);
}

// 유저 메인 화면
export const getUserMain = async (userId) => {
    return await axios.get(`/users/${userId}`);
}

// 유저 검색
export const searchWithUsername = async (username, page = 0, size = 10) => {
    return await axios.get("/users/search", {
        params: {
            username,
            page,
            size,
        },
    });
}

// 유저 아이템
export const purchaseItem = async (itemId) => {
    return await axios.post(`/users/me/items/${itemId}`);
}