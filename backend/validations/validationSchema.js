import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Invalid password"),
});

export const signupValidation = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name must be at least 12 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const postValidation = z.object({
  description: z.string().min("You number enter a description"),
  url: z.string().url("Invalid URL"),
});

const validationSchema = {
  loginValidation,
  signupValidation,
  postValidation,
};

export default validationSchema;
