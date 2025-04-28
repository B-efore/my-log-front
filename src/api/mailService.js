import axios from "./axios"

export const sendMail = async (mailRequest) => {
    return axios.post("/emails/send", mailRequest);
};