import fs from "fs";
import matter from "gray-matter";
import Layout from "../components/layout";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <Layout>
      {posts.map(
        ({ frontmatter: { title, description, date, author }, slug }) => {
          return (
            <article key={slug}>
              <header>
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-3xl font-semibold text-orange-600 no-underline">
                    {title}
                  </a>
                </Link>
                <br/>
                <span className="mb-4 text-sm">
                  {date + " "}by
                  <span className="font-bold">{" " + author}</span>
                </span>
              </header>
              <section>
                <p className="mb-8">{description}</p>
              </section>
            </article>
          );
        }
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/public/posts`);

  const posts = files.map((filename) => {
    const markdownWithMetaData = fs
      .readFileSync(`public/posts/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetaData);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
