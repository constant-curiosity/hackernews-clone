import { z } from "zod";

const validateWithZod = (schema, args) => {
  try {
    schema.parse(args);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
      }));
      throw new Error(JSON.stringify({ validationErrors: errors }));
    }
    throw error;
  }
};

export default validateWithZod;
