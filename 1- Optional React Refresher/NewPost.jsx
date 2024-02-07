import { Form, redirect  } from "react-router-dom";

const NewPost = () => {
  return (
    <div className={styles.container}>
      <Form method="post">
        <p>
          <label htmlFor="firstname">First name</label>
          <input type="text" id="firstname" name="firstname" />
        </p>
        <p>
          <label htmlFor="lasttname">Last name</label>
          <input type="text" id="lasttname" name="lasttname" />
        </p>
        <p>
          <button>Submit</button>
        </p>
      </Form>
    </div>
  );
};

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // {firstname: '...' , lasttname: '...'}
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {},
    "Content-Type": "application/json",
  });
  return redirect('/');
}
