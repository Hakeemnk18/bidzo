import axios from "axios";
import { clearToken } from "../utils/tokenHelpers";

const instance = axios.create({
  baseURL: "http://localhost:4004",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      
      clearToken()
      window.location.reload();
      
    }
    
    return Promise.reject(error);
  }
);

export default instance;