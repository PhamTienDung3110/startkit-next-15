import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
});

export type ProfileValues = z.infer<typeof ProfileSchema>;
