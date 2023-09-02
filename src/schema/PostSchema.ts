import { z } from "zod";
import PostFrontMatterSchema from "./PostFrontMatterSchema";

const PostSchema = z.object({
    content: z.string(),
    data: PostFrontMatterSchema,
});

export default PostSchema;