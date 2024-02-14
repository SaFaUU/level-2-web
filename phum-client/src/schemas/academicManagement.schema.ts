import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  year: z
    .string({ required_error: "Year is required" })
    .min(1, "Year is required"),
  startMonth: z
    .string({ required_error: "Start Month is required" })
    .min(1, "Start Month is required"),
  endMonth: z
    .string({ required_error: "End Month is required" })
    .min(1, "End Month is required"),
});
