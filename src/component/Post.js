import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Global";
import "../styles/Post.css";
import { MessageCircle, Pencil, ThumbsUp, Trash } from "lucide-react";
import Comment from "./Comment";
import Update from "./Update";

function Post() {
    const [posts, setPosts] = useState();
    const { user, refetch, setRefetch } = useContext(Context);
    const [postID, setPostID] = useState("");

    useEffect(() => {
        fetch("https://social-media-server-z7vw.onrender.com/post")
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setPosts(result.post);
                } else {
                    alert(result.message);
                }
            });
    }, [refetch]);

    function addLike(id) {
        fetch("https://social-media-server-z7vw.onrender.com/like", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ post_id: id, user: user })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setRefetch(!refetch);
                } else {
                    alert(result.message);
                }
            });
    }

    function deletePost(post_id) {
        fetch("https://social-media-server-z7vw.onrender.com/deletepost", {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ post_id: post_id })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setRefetch(!refetch);
                } else {
                    alert(result.message);
                }
            });
    }

    return (
        posts && (
            <div className="post flex">
                <div className="post__container">
                    <p>New Feeds</p>
                    {posts.map((post) => (
                        <div className="post__card">
                            <div className="flex avatar-button">
                                <div className="flex avatar">
                                    <img
                                        src="https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
                                        alt="avatar"
                                    />

                                    <p>{post.user.username}</p>
                                </div>
                                {post.user._id === user._id ? (
                                    <div
                                        className="flex"
                                        style={{ gap: "20px" }}
                                    >
                                        <div
                                            onClick={() => {
                                                setPostID(() => post._id);
                                            }}
                                            className="flex button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateModal"
                                        >
                                            <Pencil />
                                        </div>

                                        <div
                                            onClick={() => deletePost(post._id)}
                                            className="flex button"
                                        >
                                            <Trash />
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <h3>{post.topic}</h3>

                            <p>{post.content}</p>

                            <div className="flex button-collection">
                                <div
                                    onClick={() => addLike(post._id)}
                                    className="flex button"
                                >
                                    <ThumbsUp />
                                    <p>{post.likes.length}</p>
                                </div>

                                <div
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    className="flex button"
                                    onClick={() => setPostID(post._id)}
                                >
                                    <MessageCircle />
                                    <p>{post.comments.length}</p>
                                </div>
                            </div>

                            <div className="comment__section">
                                {post.comments.length > 0 ? (
                                    <p>Comments</p>
                                ) : null}
                                {post.comments.map((comment) => (
                                    <div className="flex">
                                        <p>{comment.comment}</p>
                                        <p>- {comment.user.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Comment post_id={postID} />
                <Update post_id={postID} />
            </div>
        )
    );
}

export default Post;
