import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

function AllPosts (props) {
  return (
    <div className={classes.posts}>
        <h1>All Posts</h1>
        <PostsGrid posts={props.posts} />
    </div>
  );
}

export default AllPosts;