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

export const findPassword = async (mailRequest) => {
    return axios.post("/auth/password/find", mailRequest);
}

export const resetPassword = async (passwordResetRequest) => {
    return axios.post("/auth/password/reset", passwordResetRequest);
}