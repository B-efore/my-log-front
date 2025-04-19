import axios from "axios";
import { isTokenExpired } from "../util/jwt";
import { logout } from "../util/logout";
import ToastMessage from "../components/common/ToastMessage";

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      ToastMessage("로그인 시간이 만료되었습니다.");
      logout();
    }

    return Promise.reject(error);
  }
);

export default instance;