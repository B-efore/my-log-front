import axios from "axios";
import { showErrorToast } from "../util/toast";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let logoutHandler = () => {};

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
}

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutHandler();
    }

    return Promise.reject(error);
  }
);

export default instance;