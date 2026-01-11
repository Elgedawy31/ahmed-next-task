import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    mobile: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^\d+$/, "Mobile number must contain only digits"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/@/, "Password must contain at least one @ symbol"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
    mobile_country_code: z
      .string()
      .min(1, "Country code is required")
      .regex(/^\d+$/, "Country code must contain only digits"),
    fcm_token: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
