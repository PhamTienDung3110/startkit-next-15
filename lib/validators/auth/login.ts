import { z } from "zod";

/**
 * Login Validation Schema
 * 
 * @description Zod schema cho login form:
 * - Email validation
 * - Password validation
 * - Remember me checkbox
 */

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  remember: z.boolean(),
});

/**
 * TypeScript Type
 * Infer type từ Zod schema
 */
export type LoginValues = z.infer<typeof LoginSchema>;
