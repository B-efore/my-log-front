import axios from "./axios";

export const signup = async (registerData) => {
    return axios.post("/auth/signup", registerData);
};
