import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    const entredEmail = emailInputRef.current.value;
    if (
      !entredEmail ||
      entredEmail.trim() === "" ||
      !entredEmail.includes("@") ||
      !entredEmail.includes(".") ||
      entredEmail.includes("..")
    ) {
      notificationCtx.showNotification({
        title: "Warning!",
        message: "Please enter valid input!",
        status: "information",
      });
      return;
    }
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });
    // send valid data to API
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInputRef.current.value,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
