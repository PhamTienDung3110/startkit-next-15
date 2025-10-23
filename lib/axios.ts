/**
 * HTTP Client (Axios Instance)
 *
 * @description Configured axios instance cho API calls
 * - BaseURL từ env variables (type-safe)
 * - Auto attach Authorization header (Bearer token)
 * - withCredentials: true (send cookies)
 * - Request/Response interceptors
 *
 * Usage:
 * - Client Components: import { http } from "@/lib/axios"
 * - Server Components: Dùng native fetch() (cho SEO)
 *
 * ⚠️ CHỈ DÙNG TRONG CLIENT COMPONENTS
 * ⚠️ NON-SEO PAGES (Dashboard, Settings, Admin)
 */

import axios from "axios";
import { env } from "@/env.mjs";

/**
 * HTTP Client Instance
 *
 * Config:
 * - baseURL: Từ env.NEXT_PUBLIC_API_BASE
 * - withCredentials: true (gửi cookies cho CORS requests)
 * - headers: Default Content-Type = application/json
 */
export const http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 *
 * @description Tự động attach Authorization header nếu có token
 * - Lấy token từ localStorage
 * - Attach vào header: "Authorization: Bearer {token}"
 * - Check typeof window để tránh error khi SSR
 */
http.interceptors.request.use((config) => {
  // Chỉ access localStorage khi ở client-side
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Attach token vào header nếu có
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Response Interceptor
 *
 * @description Xử lý response và errors global
 * - Success response: Pass through
 * - 401 Unauthorized: Log warning (có thể redirect to login)
 * - Other errors: Reject để component handle
 */
http.interceptors.response.use(
  (res) => res, // Success → pass through
  (err) => {
    // Handle 401 Unauthorized
    if (err.response?.status === 401) {
      console.warn("Unauthorized - Token expired or invalid");
      // TODO: Redirect to login page
      // window.location.href = "/login"
    }

    // Reject error để component có thể catch
    return Promise.reject(err);
  },
);
