import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// === Interceptor de requisição (Auth) ===
// Adiciona o token JWT no header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Auth: Registro e Login ===
export const register = (username, password) =>
  api.post("/register/", { username, password });

export const login = (username, password) =>
  api.post("/token/", { username, password });

export const refreshToken = () =>
  api.post("/token/refresh/", { refresh: localStorage.getItem("refresh") });

// === Interceptor de resposta (Refresh Token) ===
// Se o access expira, tenta renovar com refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await refreshToken();
        localStorage.setItem("token", res.data.access);
        api.defaults.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// === Clientes (CRUD) ===
export const createClient = (data) => api.post("/customers/", data);
export const getClients = () => api.get("/customers/");
export const getClient = (id) => api.get(`/customers/${id}/`);
export const updateClient = (id, data) => api.put(`/customers/${id}/`, data);
export const deleteClient = (id) => api.delete(`/customers/${id}/`);


// === Barbeiros (CRUD) ===
export const createBarber = (data) => api.post("/barbers/", data);
export const getBarbers = () => api.get("/barbers/");
export const getBarber = (id) => api.get(`/barbers/${id}/`);
export const updateBarber = (id, data) => api.put(`/barbers/${id}/`, data);
export const deleteBarber = (id) => api.delete(`/barbers/${id}/`);


// === Serviços (CRUD) ===
export const createService = (data) => api.post("/services/", data);
export const getServices = () => api.get("/services/");
export const getService = (id) => api.get(`/services/${id}/`);
export const updateService = (id, data) => api.put(`/services/${id}/`, data);
export const deleteService = (id) => api.delete(`/services/${id}/`);

export default api;
