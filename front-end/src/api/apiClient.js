import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://proyectofinal-cilsa-back-end.onrender.com",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;