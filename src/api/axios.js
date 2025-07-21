import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 일반
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

// reissue 용
const authInstance = axios.create({
  baseURL: instance.defaults.baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function reissueToken() {
  return await authInstance.post('/auth/reissue');
}

let logoutHandler = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
};

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
}

let isRefreshing = false;
let requestQueue = [];

function processQueue(error, token = null) {
  requestQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.config.headers.Authorization = `Bearer ${token}`;
      promise.resolve(instance(promise.config));
    }
  });
  requestQueue = [];
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      const errorMsg = error.response?.data?.message;

      if (errorMsg === "만료된 토큰입니다.") {

        isRefreshing = true;

        try {
          const res = await reissueToken();
          const newAccessToken = res.data.accessToken;
          localStorage.setItem('token', newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (err) {
          logoutHandler();
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;