import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostFrontMatterSchema from "@/schema/PostFrontMatterSchema";
import { z } from "zod";
import PostSchema from "@/schema/PostSchema";
import { serialize } from "next-mdx-remote/serialize";
import { encode } from "blurhash";
import blurHashToDataURL from "./blurHashToDataUrl";
import { StaticImageData } from "next/image";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "src", "posts");

export const IMAGES_PATH = path.join(process.cwd(), "public");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

/**
 * Get a post and it's frontmatter
 * @param slug The end of the file path without the extension
 * @returns Serialized post data and frontmatter
 */
export const getPost = async (slug: string) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), "utf8");

  const { data, content } = matter(source);

  const parsedData = await PostFrontMatterSchema.parseAsync(data);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: parsedData,
  });

  if (parsedData.image) {
    const imageMeta = await extractImageMeta(parsedData.image);

    return {
      frontmatter: parsedData,
      content: mdxSource,
      image: imageMeta,
    };
  }

  return {
    frontmatter: parsedData,
    content: mdxSource,
    image: undefined,
  };
};

/**
 * Get all posts and their frontmatter
 * @returns All posts with their frontmatter
 */
export const getPosts = async () => {
  const posts = postFilePaths.map(async (filePath) => {
    const slug = filePath.replace(/\.mdx?$/, "");

    const { frontmatter, image } = await getPost(slug);

    return {
      ...frontmatter,
      image,
      slug,
    };
  });

  const allPosts = await Promise.all(posts);

  return allPosts.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (aDate > bDate) return -1;
    if (aDate < bDate) return 1;
    return 0;
  });
};

export const getPostSlugs = () => {
  return postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({
      params: {
        slug,
      },
    }));
};

export interface ImageMeta extends StaticImageData {
  blurhash: string;
}

const extractImageMeta = async (content: string): Promise<ImageMeta> => {
  const image = await fs.promises.readFile(path.join(IMAGES_PATH, content));

  const buffer = Buffer.from(image);

  const { default: sharp } = await import("sharp");

  const blurhashMeta = await new Promise<string>((res, rej) => {
    sharp(buffer)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          rej(err);
          return;
        }

        /** Base63 */
        const blurhashStr = encode(
          new Uint8ClampedArray(buffer),
          width,
          height,
          4,
          4
        );

        res(blurhashStr);
      });
  });

  const imageMeta = await sharp(buffer).metadata();

  if (!imageMeta.height || !imageMeta.width) {
    throw new Error("Image metadata is missing");
  }

  const blurDataUrl = blurHashToDataURL(blurhashMeta, 4, 4);

  return {
    blurhash: blurhashMeta,
    blurDataURL: blurDataUrl,
    blurHeight: 4,
    blurWidth: 4,
    height: imageMeta.height,
    width: imageMeta.width,
    src: content,
  };
};
