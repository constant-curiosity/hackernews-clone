import { z } from "zod";

export const postSchema = z.object({
  description: z.string().min(1, "Must include a description"),
  url: z.string().url("Must be a valid url"),
});

export default postSchema;
