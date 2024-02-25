import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../helpers/posts-util";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Hadi's Blog</title>
        <meta name="description" content="I post about programming and web developement." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    }
  };
}

export default HomePage;
