import { z } from "zod";

export const searchFeedSchema = z.object({
  description: z.string().min(2, "Minium length of 2 characters"),
});

export default searchFeedSchema;
