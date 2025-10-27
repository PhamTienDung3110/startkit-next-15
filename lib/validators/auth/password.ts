import { z } from "zod";

/**
 * Password Utilities
 * 
 * @description Utility functions và schemas cho password:
 * - Password strength checker
 * - Password validation schemas
 * - Password reset schemas
 */

/**
 * Password Strength Helper
 * Utility function để check password strength
 */
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  
  const strengthMap = {
    0: { label: "Rất yếu", color: "text-red-500" },
    1: { label: "Yếu", color: "text-red-400" },
    2: { label: "Trung bình", color: "text-yellow-500" },
    3: { label: "Khá", color: "text-yellow-400" },
    4: { label: "Mạnh", color: "text-green-500" },
    5: { label: "Rất mạnh", color: "text-green-600" },
    6: { label: "Cực mạnh", color: "text-green-700" },
  };
  
  return {
    score,
    ...strengthMap[score as keyof typeof strengthMap],
  };
};

/**
 * Forgot Password Schema
 * Validation cho forgot password form
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
});

/**
 * Reset Password Schema
 * Validation cho reset password form
 */
export const ResetPasswordSchema = z
  .object({
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
    path: ["confirmPassword"],
  });

/**
 * Change Password Schema
 * Validation cho change password form (trong settings)
 */
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z
      .string()
      .min(1, "Mật khẩu mới là bắt buộc")
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu mới không được quá 100 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu mới phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),
    confirmNewPassword: z
      .string()
      .min(1, "Xác nhận mật khẩu mới là bắt buộc"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới phải khác mật khẩu hiện tại",
    path: ["newPassword"],
  });

/**
 * TypeScript Types
 * Infer types từ Zod schemas
 */
export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;
