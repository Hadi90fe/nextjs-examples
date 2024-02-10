import { useState } from "react";
import { getData } from "@/helpers/getters-setters";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    // we already have this data via getStaticProps, we are using client fetch here just to Test api/[feedbackId] endpoint
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.data.map((elem) => (
          <li key={elem.id}>
            {elem.text} -{" "}
            <button onClick={loadFeedbackHandler.bind(null, elem.id)}>
              Show Details
            </button>
          </li>
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
    revalidate: 30,
  };
}
export default FeedbackPage;
