import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { getData } from "@/helpers/getters-setters";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [feedbackbacks, setFeedbackbacks] = useState(props.data);
  const [addedFeedback, setAddedFeedback] = useState();

  const emailInput = useRef();
  const feedbackInput = useRef();

  const { data, error, isLoading } = useSWR("/api/feedback", (url) =>
    fetch(url).then((r) => r.json())
  );
  useEffect(() => {
    // we used useEffect here to combine prefeched data in server side with fetched data in client side
    setFeedbackbacks(data);
  }, [data]);

  async function submitHandeler(event) {
    event.preventDefault();
    const reponse = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.current.value,
        text: feedbackInput.current.value,
      }),
    });
    const result = await reponse.json();
    console.log(result.message);
    setAddedFeedback(result.data);
    setFeedbackbacks([...feedbackbacks, result.data]);
  }

  if (error) {
    return <p>Failed to load</p>;
  }

  if (isLoading || !feedbackbacks) {
    return <h1>fetching...</h1>;
  }
  return (
    <>
      <form onSubmit={submitHandeler}>
        <div>
          <label htmlFor="email" id="email">
            Email:
          </label>
          <input type="email" id="email" name="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback" id="feedback">
            Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows="5"
            cols="33"
            ref={feedbackInput}
          />
        </div>
        <button>Sumbit feedback</button>
        <p>
          {addedFeedback &&
            `Feedback saved succesfully => ` + addedFeedback.text}
        </p>
      </form>
      <h5>Available feedbacks:</h5>
      <ul>
        {feedbackbacks.map((ele) => (
          <li key={ele.id}>{ele.text}</li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const response = await getData();
  return {
    props: {
      data: response,
    },
    revalidate: 10,
  };
}
