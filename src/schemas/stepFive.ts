import { z } from "zod";

export const stepFiveSchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: "You must confirm before continuing",
  }),
});
