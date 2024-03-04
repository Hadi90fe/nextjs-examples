import Head from 'next/head';
import MeetupList from "@/components/meetups/MeetupList";
import { connectDatabase, getAllDocuments } from "@/helpers/db-util";
// import { getFeaturedMeetups } from "@/helpers/firebase-util";


function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a huge list highly active React meetups!' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // getStaticProps means this page should be pre-generated on build time
  // An example of prerendering featured-products to list in a HomePage
  //  const featuredMeetups = await getFeaturedMeetups();

  let client;
  let featuredMeetups;
  try {
    client = await connectDatabase();
    featuredMeetups = await getAllDocuments(
      client,
      "meetups",
      { isFeatured: true },
      { _id: -1 }
    );
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }


  if (!featuredMeetups) {
    return { notFound: true };
  }

  return {
    props: {
      meetups: featuredMeetups,
    },
    revalidate: 1800 // 1800 Seconds = 30 minutes
  };
}
export default HomePage;