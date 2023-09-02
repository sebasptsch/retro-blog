import Navbar from "@/components/Navbar";
import NavItem from "@/components/NavItem";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import FooterSection from "@/components/FooterSection";
import FooterItem from "@/components/FooterItem";
import Root from "@/components/Root";
import HomeHero from "@/components/HomeHero";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPosts } from "@/utils/mdx";
import Link from "next/link";
import { DateTime } from "luxon";
import Image from "next/image";

export const getStaticProps: GetStaticProps<{
  posts: Awaited<ReturnType<typeof getPosts>>;
}> = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { posts } = props;
  return (
    <Root>
      {/* <Navbar>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
      </Navbar> */}
      <Main>
        <HomeHero />
        {/* <div className="card shadow-lg compact bg-neutral text-neutral-content m-10 w-1/2 self-center">
          {firstPost.image ? (
            <figure className="object-fill aspect-video">
              <Image
                src={firstPost.image}
                alt={firstPost.description}
                layout="responsive"
                // width={720}
                // height={480}
              />
            </figure>
          ) : null}
          <div className="card-body">
            <div className="flex items-center">
              <h2 className="card-title flex-grow">{firstPost.title}</h2>
              <div className="badge badge-outline">
                {DateTime.fromISO(firstPost.date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </div>
            </div>

            <p>{firstPost.description}</p>
          </div>
        </div>
        <hr className="border-neutral-content mx-10" /> */}
        <section className="p-10 grid grid-flow-row lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              className="card shadow-lg compact bg-neutral text-neutral-content"
              key={post.title}
            >
              {post.image ? (
                <figure className="aspect-video relative">
                  <Image
                    src={post.image}
                    alt={post.description}
                    className="object-cover"
                    onBlur={() => {
                      console.log("blur");
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                  />
                </figure>
              ) : null}
              <div className="card-body">
                <div className="flex items-center">
                  <h2 className="card-title grow">{post.title}</h2>
                  <div className="badge badge-outline">
                    {DateTime.fromISO(post.date).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </div>
                </div>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </section>
      </Main>
      {/* <Footer>
        <FooterSection title="Socials">
          <FooterItem href="https://github.com/sebasptsch">Github</FooterItem>
        </FooterSection>
      </Footer> */}
    </Root>
  );
}
