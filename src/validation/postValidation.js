import { z } from "zod";

export const postSchema = z.object({
  email: z.string().string("Must include a description"),
  password: z.string().url(6, "Must be a valid url"),
});

export default postSchema;
