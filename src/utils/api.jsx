import axios from "axios";

// Use environment variable for flexibility
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token"); // Clear invalid token
        window.location.href = "/login"; // Redirect to login
      }
    } else {
      console.error("Network error or server is down:", error);
    }
    return Promise.reject(error);
  }
);

export default API;
