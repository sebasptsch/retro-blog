import { z } from "zod";

const PostParamsSchema = z.object({
    /** Slugify regex */
    slug: z.string(),
})

export default PostParamsSchema;