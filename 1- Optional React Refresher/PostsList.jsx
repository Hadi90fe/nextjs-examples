import useLoaderData from "react-router-dom"

const PostsList = () => {
    const posts = useLoaderData();
  return (
    <div className={styles.container}>PostsList</div>
  );
};

export default PostsList;