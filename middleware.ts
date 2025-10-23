/**
 * Internationalization Middleware
 *
 * @description Xử lý routing cho multi-language support
 * - Tự động detect locale từ URL hoặc Accept-Language header
 * - Redirect /abc → /vi/abc (default locale)
 * - Match /vi/*, /en/*, /jp/*
 *
 * Flow:
 * 1. User visit / → redirect to /vi (defaultLocale)
 * 2. User visit /en → stay at /en (valid locale)
 * 3. User visit /fr → redirect to /vi (invalid locale)
 */

import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales, // ['vi', 'en', 'jp']
  defaultLocale, // 'vi'
  localePrefix: "always", // URL luôn có prefix /vi, /en (không có route / trực tiếp)
});

/**
 * Matcher Config
 * Định nghĩa routes nào sẽ chạy qua middleware
 *
 * Exclude:
 * - /api/* - API routes
 * - /_next/* - Next.js internal files
 * - /*.* - Static files (images, fonts, etc.)
 */
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
