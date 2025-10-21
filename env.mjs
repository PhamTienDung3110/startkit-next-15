import { z } from "zod";

// 1. Schema khai báo biến môi trường
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_API_BASE: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
});

// 2. Đọc và validate từ process.env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("❌ Env validation failed.");
}

// 3. Xuất biến đã được type-safe
export const env = parsed.data;
