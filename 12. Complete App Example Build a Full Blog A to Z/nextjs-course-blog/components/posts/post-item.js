import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

function PostsItem(props) {
    const { title, image, excerpt, date, slug } = props.postData;

    const formatedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const imagePath = `/images/posts/${slug}/${image}`;
    const linkPath = `/posts/${slug}`;

    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                    <Image
                        className={classes.image}
                        src={imagePath}
                        alt={title}
                        width={300}
                        height={200}
                    />

                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formatedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>
    );
}

export default PostsItem;
