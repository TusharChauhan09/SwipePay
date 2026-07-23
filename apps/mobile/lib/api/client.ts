import axios from "axios";
import {useAuthStore} from "@/store/useAuthStore";
import {config} from "@/constants/config";

const API_BASE_URL = config.apiBaseUrl;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
})


apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);