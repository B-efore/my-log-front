import axios from "./axios"

export const createGuestBook = async (request) => {
    return await axios.post("/guestbooks", request);
};

export const getGuestBooks = async (userId, page, size) => {
    return await axios.get(`/users/${userId}/guestbooks`, {
        params: {size, page},
    });
};