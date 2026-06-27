import axios from "axios";

const productionApiUrl = "https://real-chat2026.onrender.com";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === "production" ? productionApiUrl : ""),
  timeout: 30000, // 30s timeout — Render free tier can be slow on cold start
  withCredentials: true,
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
