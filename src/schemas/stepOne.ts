import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const is18Plus = (date: Date) => {
  const today = new Date();
  const eighteen = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return date <= eighteen;
};

export const stepOneSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least two words"
    ),
  email: z.email({
    pattern: z.regexes.html5Email,
    error: "Enter a valid email",
  }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  dateOfBirth: z.date().refine(is18Plus, "You must be at least 18 years old"),
  profilePic: z
    .file()
    .max(2000000, {
      error: "File must be less then 2MB",
    })
    .mime(["image/png", "image/jpeg"], {
      error: "Only accept JPG and PNG",
    })
    .optional(),
});
