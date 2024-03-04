import Head from 'next/head';
import MeetupDetail from "@/components/meetups/MeetupDetail";
import {
  connectDatabase,
  getAllDocumentsIds,
  getDocumentById,
} from "@/helpers/db-util";
// import { getFeaturedMeetups, getMeetupById } from "@/helpers/firebase-util";

function MeetupDetailPage(props) {
  const meetup = props.meetup;

  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name='description' content={meetup.description} />
      </Head>
      <MeetupDetail
        title={meetup.title}
        description={meetup.description}
        address={meetup.address}
        image={meetup.image}
      />
    </>
  );
}

export async function getStaticProps(context) {
  // getStaticProps means this page should be pre-generated on build time
  // An example of prerendering product details by using an Id retreived with getStaticPaths()
  const meetupId = context.params.meetupId;

  let client;
  let meetup;
  client = await connectDatabase();
  meetup = await getDocumentById(client, "meetups", meetupId);
  client.close();

  if (!meetup) {
    return { notFound: true };
  }

  return {
    props: {
      meetup: meetup,
    },
    revalidate: 3600, // Seconds
  };
}

export async function getStaticPaths() {
  // getStaticPaths to generate a list of id's for a selected products
  // This should be in [soemthingId] alike page
  // Those id's will be used with getStaticProps() to pre-render a detailPage for each of those products
  // const featuredMeetups = await getFeaturedMeetups();

  let client;
  let featuredMeetups;
  try {
    client = await connectDatabase();
    featuredMeetups = await getAllDocumentsIds(client, "meetups", { isFeatured: true });
    client.close();
  } catch (error) {
    res
      .status(500)
      .json({ message: error || "Connecting to the database failed!" });
    return;
  }

  const paths = await featuredMeetups.map((meetup) => ({
    params: { meetupId: meetup._id },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default MeetupDetailPage;
