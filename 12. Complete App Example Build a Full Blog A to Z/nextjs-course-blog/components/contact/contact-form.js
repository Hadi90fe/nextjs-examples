import { useRef } from "react";
import classes from "./contact-form.module.css";

function ContactForm() {
    const email = useRef();
    const name = useRef();
    const message = useRef();

    function sendMsgHandler(event) {
        event.preventDefault();
        const messageData = {
            email: email.current.value,
            name: name.current.value,
            message: message.current.value,
        };
        // console.log(messageData)
        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(messageData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    return (
        <section className={classes.contact}>
            <h1>How can I help you ?</h1>
            <form className={classes.form} onSubmit={sendMsgHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" ref={email} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" ref={name} required />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows={5} ref={message}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
        </section>
    );
}

export default ContactForm;
