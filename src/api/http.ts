import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const currentStore = localStorage.getItem("currentStore");
  if (currentStore) {
    config.params = { ...(config.params || {}), storeId: config.params?.storeId || currentStore };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
