import axios from "./axios"

export const getDailyFortune = async() => {
    return axios.get(`/openai/fortune`);
}