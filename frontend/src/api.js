import axios from "axios";

const productionApiUrl = "https://real-chat2026.onrender.com";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === "production" ? productionApiUrl : ""),
  timeout: 60000, // 60s — Render free tier cold start can take up to 50s
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

// Retry once on timeout or network error (handles Render cold start)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    // Only retry once, only on timeout or no-response network errors
    if (!config._retried && (error.code === "ECONNABORTED" || !error.response)) {
      config._retried = true;
      return api(config);
    }
    return Promise.reject(error);
  }
);

export default api;
