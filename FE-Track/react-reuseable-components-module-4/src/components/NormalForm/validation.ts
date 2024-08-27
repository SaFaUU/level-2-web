import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(50, { message: "Password is too long" }),
  age: z
    .number()
    .min(1, { message: "Age is required" })
    .max(100, { message: "Age is too high" }),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
});

export type TNormalForm = z.infer<typeof SignUpSchema>;
