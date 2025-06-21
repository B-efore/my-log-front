import axios from "./axios"

export const sendMail = async (mailRequest) => {
    return axios.post("/emails/send", mailRequest);
};

export const verifyCode = async (mailVerifyRequest) => {
    return axios.post("/emails/verify", mailVerifyRequest);
}