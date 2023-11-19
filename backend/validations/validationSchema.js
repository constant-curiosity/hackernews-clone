import { z } from "zod";

export const signupValidation = z.object({
  name: z.string().min(2, "Name must be at least 12 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const validationSchema = {
  signupValidation,
  loginValidation,
};

export default validationSchema;
