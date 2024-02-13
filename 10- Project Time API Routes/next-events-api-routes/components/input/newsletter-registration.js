import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    const entredEmail = emailInputRef.current.value
    if (
      !entredEmail ||
      entredEmail.trim() === "" ||
      !entredEmail.includes("@") ||
      !entredEmail.includes(".") ||
      entredEmail.includes("..")
    ) {
      setIsInvalid(true);
      return;
    }
    // send valid data to API
    setIsInvalid(false);
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
    result ? console.log(result.message) : console.log("Error!");
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
          {isInvalid && <p>Please enter a valid email address!</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
