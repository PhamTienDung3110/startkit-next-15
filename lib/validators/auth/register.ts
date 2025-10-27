import { z } from "zod";

/**
 * Register Validation Schema
 * 
 * @description Zod schema cho register form:
 * - Name validation với regex
 * - Email validation
 * - Password strength validation
 * - Password confirmation matching
 */

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "Họ tên là bắt buộc")
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(50, "Họ tên không được quá 50 ký tự")
      .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Email không hợp lệ"),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu không được quá 100 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),
    confirmPassword: z
      .string()
      .min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở field confirmPassword
  });

/**
 * TypeScript Type
 * Infer type từ Zod schema
 */
export type RegisterValues = z.infer<typeof RegisterSchema>;
