import axios from "./axios";

export const signup = async (registerData) => {
    return axios.post("/auth/signup", registerData);
};

export const login = async (loginData) => {
    return axios.post("/auth/login", loginData);
}

export const reissueToken = async () => {
    return axios.post("/auth/reissue");
}

export const findAccountId = async (mailRequest) => {
    return axios.post("/auth/accountId", mailRequest);
}

export const findPassword = async (mailRequest) => {
    return axios.post("/auth/password/find", mailRequest);
}

export const resetPassword = async (passwordResetRequest) => {
    return axios.post("/auth/password/reset", passwordResetRequest);
}