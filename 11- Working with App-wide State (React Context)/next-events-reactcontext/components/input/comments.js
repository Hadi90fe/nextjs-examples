import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  useEffect(() => {
    showComments && setIsCommentsLoading(true);
    fetch(`/api/comments/${eventId}`)
      .then((r) => r.json())
      .then((data) => setCommentsData(data.comments));
    setIsCommentsLoading(false);
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });
    try {
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
      if (response.ok) {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      } else {
        throw new Error(result.message || "Something went wrong!");
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isCommentsLoading && commentsData && (
        <CommentList items={commentsData} />
      )}
      {showComments && isCommentsLoading && <h3>Fetching comments...</h3>}
    </section>
  );
}

export default Comments;
