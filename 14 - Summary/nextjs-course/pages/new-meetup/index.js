import Head from 'next/head';
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

async function createMeetup(meetupData) {
  const response = await fetch("/api/meetups", {
    method: "POST",
    body: JSON.stringify(meetupData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const fetchData = await createMeetup(meetupData);
    console.log(fetchData);
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name='description' content='Add your own meetups and create amazing networking opportunities.' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
