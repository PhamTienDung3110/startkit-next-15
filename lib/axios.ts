import axios from "axios";
import { env } from "@/env.mjs";

export const http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request
http.interceptors.request.use((config) => {
  // Nếu có Auth token => attach
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor response
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Tự xử lý lỗi 401 hoặc log ra
    if (err.response?.status === 401) console.warn("Unauthorized");
    return Promise.reject(err);
  },
);
