import PostParamsSchema from "@/schema/PostParamsSchema";
import { getPost, getPostSlugs } from "@/utils/mdx";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import PostLayout from "@/layouts/PostLayout";

export const getStaticProps: GetStaticProps<{
  post: Awaited<ReturnType<typeof getPost>>;
}> = async ({ params }) => {
  const { slug } = await PostParamsSchema.parseAsync(params);
  const post = await getPost(slug);

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PostLayout frontmatter={post.frontmatter} image={post.image}>
      <MDXRemote {...post.content} />
    </PostLayout>
  );
}
