import styles from './Posts.module.css';

const Posts = () => {
  return (
    <PostsList />
  );
};

export default Posts;

export async function loader() {
    const response = await fetch("http://localhost:8080/posts");
    const resData = await response.json();
    return resData.posts;
  }