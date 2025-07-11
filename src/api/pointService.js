import axios from "./axios"

export const getMyPoint = async () => {
    return await axios.get("/points/me");
};