import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username, password) => 
  api.post("/register/", { username, password });

export const login = (username, password) =>
  api.post("/token/", { username, password });

export default api;
