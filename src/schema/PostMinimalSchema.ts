import { z } from "zod";
import PostFrontMatterSchema from "./PostFrontMatterSchema";

const PostMinimalSchema = z.object({
    data: PostFrontMatterSchema,
    slug: z.string(),
})

export default PostMinimalSchema;