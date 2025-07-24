import axios from "./axios"

export const editReadme = async (request) => {
    return axios.post("/readme", request);
};