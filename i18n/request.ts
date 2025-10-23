/**
 * next-intl Request Configuration
 *
 * @description Cấu hình request-level cho next-intl
 * - Validate locale từ request
 * - Load messages tương ứng với locale
 * - Fallback về default locale nếu invalid
 *
 * Flow:
 * 1. Lấy locale từ URL (requestLocale)
 * 2. Validate locale có hợp lệ không
 * 3. Nếu invalid → fallback về 'vi'
 * 4. Import messages tương ứng từ /messages/{locale}.json
 *
 * Note: File này được reference trong next.config.ts
 */

import { getRequestConfig } from "next-intl/server";
import { locales, Locale } from "@/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await locale từ request (Next.js 15+ params là Promise)
  let locale = await requestLocale;

  // Validate locale - nếu không hợp lệ thì fallback về default
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "vi"; // Default locale
  }

  return {
    locale, // Locale đã được validate
    messages: (await import(`@/messages/${locale}.json`)).default, // Dynamic import messages
  };
});
