/**
 * Environment Variables Validation
 *
 * @description Type-safe environment variables với Zod validation
 * - Validate env vars lúc build time
 * - Fail fast nếu thiếu hoặc invalid env vars
 * - Type-safe access: env.NEXT_PUBLIC_API_BASE thay vì process.env.NEXT_PUBLIC_API_BASE
 *
 * Setup:
 * 1. Tạo file .env.local với các biến cần thiết
 * 2. Import { env } từ "@/env.mjs"
 * 3. Dùng env.VARIABLE_NAME (có IntelliSense)
 *
 * Note: NEXT_PUBLIC_* = client-side accessible, còn lại = server-only
 */

import { z } from "zod";

/**
 * Environment Schema
 * Định nghĩa tất cả env variables cần thiết và validation rules
 */
const envSchema = z.object({
  /** Environment mode - development, test, hoặc production */
  NODE_ENV: z.enum(["development", "test", "production"]),

  /** API Base URL - phải là valid URL */
  NEXT_PUBLIC_API_BASE: z.string().url(),

  /** NextAuth URL - phải là valid URL */
  NEXTAUTH_URL: z.string().url(),

  /** NextAuth Secret - phải có ít nhất 1 ký tự */
  NEXTAUTH_SECRET: z.string().min(1),
});

/**
 * Parse và Validate Environment Variables
 * safeParse = không throw error ngay, trả về success/error object
 */
const parsed = envSchema.safeParse(process.env);

// Nếu validation failed → log error và throw
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("❌ Env validation failed.");
}

/**
 * Type-safe Environment Variables
 *
 * Usage:
 * import { env } from "@/env.mjs"
 * const apiUrl = env.NEXT_PUBLIC_API_BASE // ✅ Type-safe, có IntelliSense
 */
export const env = parsed.data;
