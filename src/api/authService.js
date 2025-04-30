import axios from "./axios";

export const signup = async (registerData) => {
    return axios.post("/auth/signup", registerData);
};

export const login = async (loginData) => {
    return axios.post("/auth/login", loginData);
}

export const verifyCode = async (mailVerifyRequest) => {
    return axios.post("/auth/verify", mailVerifyRequest);
}