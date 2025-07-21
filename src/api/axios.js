import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: `${apiBaseUrl}`,
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

export async function reissueToken() {
  return await instance.post('/auth/reissue');
}

let logoutHandler = () => { };

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await reissueToken();
        if (res.status === 200) {
          const newAccessToken = res.data.accessToken;
          localStorage.setItem('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          return instance(originalRequest);
        }
      } catch (err) {
        logoutHandler();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;