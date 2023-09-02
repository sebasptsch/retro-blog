import Main from "@/components/Main";
import Root from "@/components/Root";
import PostFrontMatterSchema from "@/schema/PostFrontMatterSchema";
import Image, { StaticImageData } from "next/image";
import { z } from "zod";

interface PostLayoutProps {
  frontmatter: z.infer<typeof PostFrontMatterSchema>;
  children: React.ReactNode;
  image?: StaticImageData;
}

export default function PostLayout(props: PostLayoutProps) {
  const { frontmatter, children, image } = props;

  return (
    <Root>
      <Main>
        <div className="md:m-10 md:shadow-lg bg-neutral text-neutral-content flex-grow md:rounded-box p-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-center bold font-semibold">
              {frontmatter.title}
            </h2>
            <p className="text-center text-lg">{frontmatter.description}</p>
            {image ? (
              <figure className="relative">
                <Image
                  src={image}
                  alt={frontmatter.description}
                  className="object-cover max-h-96 rounded-box"
                  onBlur={() => {
                    console.log("blur");
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                />
              </figure>
            ) : null}
            <div className="flex">{children}</div>
          </div>
        </div>
      </Main>
    </Root>
  );
}
