import { z } from "zod";

const isWithin90Days = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxFutureDate = new Date();
  maxFutureDate.setDate(today.getDate() + 90);

  return date >= today && date <= maxFutureDate;
};
export const stepTwoSchema = z
  .object({
    department: z.string({ error: "Please Select a department!" }),
    position: z.string().min(3, { error: "At least 3 characters!" }),
    startDate: z
      .date({ error: "Please select a date" })
      .refine(isWithin90Days, { error: "Can't hire you after 90 days!" }),
    jobType: z.enum(["full-time", "part-time", "contract"], {
      error: "You need to select a type.",
    }),
    salaryExpt: z.number({
      error: "Select your job type and express your expectation!",
    }),

    manager: z.string().min(2, { error: "Select a Manager" }),
  })
  .refine(
    (data) => {
      if (["HR", "Finance"].includes(data.department)) {
        const day = data.startDate.getDay();
        if (day === 5 || day === 6) {
          return false;
        }
      }
      return true;
    },
    {
      error:
        "Start dates for HR and Finance roles must not be scheduled on Fridays or Saturdays.",
      path: ["startDate"], // show error under startDate field
    }
  )
  .superRefine((data, ctx) => {
    const { jobType, salaryExpt } = data;

    if (
      jobType === "full-time" &&
      (salaryExpt < 30000 || salaryExpt > 200000)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryExpt"], // which field the error belongs to
        message: "Full-time salary must be between $30,000 and $200,000",
      });
    }

    if (jobType === "part-time" && (salaryExpt < 5000 || salaryExpt > 30000)) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryExpt"],
        message: "Part-time salary must be between $5,000 and $30,000",
      });
    }

    if (jobType === "contract" && (salaryExpt < 50 || salaryExpt > 150)) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryExpt"],
        message: "Contract rate must be between $50 and $150",
      });
    }
  });
