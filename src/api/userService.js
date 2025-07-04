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

export const getUserActivity = async (userId, startDate, endDate) => {
    return await axios.get(`/users/${userId}/activity`, {
        params: {
            startDate, endDate
        },
    });
}

export const searchWithUsername = async (username, page = 0, size = 10) => {
    console.log("username: ", username);
    return await axios.get("/users/search", {
        params: {
            username,
            page,
            size,
        },
    });
}