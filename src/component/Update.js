import React, { useContext, useRef } from "react";
import "../styles/Comment.css";
import { Context } from "../context/Global";

function Update({ post_id }) {
    const { refetch, setRefetch } = useContext(Context);

    const topicRef = useRef();
    const contentRef = useRef();

    function handleUpdate() {
        fetch("https://social-media-server-z7vw.onrender.com/updatepost", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                post_id: post_id,
                topic: topicRef.current.value,
                content: contentRef.current.value
            })
        })
            .then((response) => response.json())
            .then((result) => {
                setRefetch(!refetch);
                topicRef.current.value = "";
                contentRef.current.value = "";
                if (result.status === 0) {
                    alert(result.message);
                }
            });
    }

    return (
        <div>
            <div
                className="modal fade"
                id="updateModal"
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
                                Update Post
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
                                placeholder="Write Updated Topic"
                                ref={topicRef}
                            />

                            <input
                                type="text"
                                placeholder="Write Updated Content"
                                ref={contentRef}
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
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
