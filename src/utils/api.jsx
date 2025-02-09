import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://taskmanager-backend-5my8.onrender.com/api",
});

// Automatically add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
