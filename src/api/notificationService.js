import axios from "./axios"

export const getNotifications = async (page = 0, size = 10) => {
    return await axios.get("/notifications", {
        params: {size, page},
    });
};

export const countUnreadNotification = async () => {
    return await axios.get("/notifications/count");
}

export const updateNotificationRead = async () => {
    return await axios.patch("/notifications");
}