import React, { useContext, useRef } from "react";
import "../styles/Comment.css";
import { Context } from "../context/Global";

function Comment({ post_id }) {
    const { user, refetch, setRefetch } = useContext(Context);

    const commentRef = useRef();

    function uploadComment() {
        fetch("https://social-media-server-z7vw.onrender.com/comment", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                post_id: post_id,
                user: user,
                comment: commentRef.current.value
            })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setRefetch(!refetch);
                } else {
                    alert(result.message);
                }
                commentRef.current.value = "";
            });
    }

    return (
        <div>
            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Add your comment
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Comments"
                                ref={commentRef}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={uploadComment}
                            >
                                Add comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
