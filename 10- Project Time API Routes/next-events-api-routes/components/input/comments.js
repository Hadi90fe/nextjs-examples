import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    showComments && fetch(`/api/comments/${eventId}`)
      .then((r) => r.json())
      .then((data) => setCommentsData(data.comments));
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...commentData,
      }),
    });
    const result = await response.json();
    console.log(result.message, result.comment);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && commentsData && <CommentList items={commentsData} />}
    </section>
  );
}

export default Comments;
