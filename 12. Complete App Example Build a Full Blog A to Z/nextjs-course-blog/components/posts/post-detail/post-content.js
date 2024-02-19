import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import Image from "next/image";

function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown
                components={{
                    //   img: (node, props) => {
                    //     <Image
                    //       src={`/images/posts/${post.slug}/${props.src}`}
                    //       alt={props.alt}
                    //       width={600}
                    //       height={300}
                    //     />;
                    //   },
                    p: (props) => {
                        const { node, children } = props;
                        if (node.children[0].tagName === "img") {
                            const image = node.children[0].properties;
                            return (
                                <div className={classes.image}>
                                    <Image
                                        src={`/images/posts/${post.slug}/${image.src}`}
                                        alt={image.alt}
                                        width={600}
                                        height={300}
                                    />
                                </div>
                            );
                        }
                        return <p>{children}</p>;
                    },

                    code: (props) => {
                        const { children, className, node, ...rest } = props;
                        const language = /language-(\w+)/.exec(className || '')
                        // console.log(language[1])
                        return (
                            <SyntaxHighlighter
                                {...rest}
                                style={atomDark}
                                children={String(children).replace(/\n$/, '')}
                                language={language[1]}
                            />
                        );
                    },
                }}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default PostContent;
