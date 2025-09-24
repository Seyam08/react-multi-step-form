import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const stepFourSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least two words"
    ),
  relationship: z.string({ error: "Please Select the relative!" }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  guardianName: z.string().optional(),
  guardianPhone: z
    .string()
    .optional()
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: "Invalid phone number",
    }),
});
