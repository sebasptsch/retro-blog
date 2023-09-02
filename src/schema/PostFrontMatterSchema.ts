import { z } from "zod";

const PostFrontMatterSchema = z.object({
  title: z.string(),
  date: z.coerce.string().transform((date) => new Date(date).toISOString()),
  description: z.string(),
  /**
   * Checks a path starts with assets/images/
   */
  image: z
    .string()
    .optional()
    .refine((path) => path && path.startsWith("/assets/images/"), {
      message: "Image path must start with assets/images/",
    }),
});

export default PostFrontMatterSchema;
