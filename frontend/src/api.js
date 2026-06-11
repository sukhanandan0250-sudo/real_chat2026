import axios from "axios";

// In production (Vercel), API calls go to the same domain via rewrites.
// In local dev, proxy in package.json forwards to localhost:8000.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
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
