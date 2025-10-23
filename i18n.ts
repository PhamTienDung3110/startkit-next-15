/**
 * Internationalization Configuration
 *
 * @description Cấu hình các locales hỗ trợ trong app
 * - Định nghĩa danh sách locales
 * - Set default locale
 * - Export type-safe Locale type
 *
 * Locales hỗ trợ: vi (Tiếng Việt), en (English), jp (日本語)
 */

/** Danh sách tất cả locales hỗ trợ - as const để type-safe */
export const locales = ["vi", "en", "jp"] as const;

/** Default locale khi user chưa chọn hoặc locale không hợp lệ */
export const defaultLocale = "vi";

/** Type-safe Locale type - union type of "vi" | "en" | "jp" */
export type Locale = (typeof locales)[number];
