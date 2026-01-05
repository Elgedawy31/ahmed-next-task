import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .min(1, "Verification code is required")
    .regex(/^\d+$/, "Verification code must contain only digits")
    .length(6, "Verification code must be 6 digits"),
});

export type VerifyFormData = z.infer<typeof verifySchema>;
