import React, { useContext, useRef } from "react";
import { Context } from "../context/Global";
import "../styles/Upload.css";
import { Link } from "react-router-dom";

function Upload() {
    const topicRef = useRef();
    const contentRef = useRef();

    const { user, refetch, setRefetch } = useContext(Context);

    function handleUpload() {
        const post = {
            user: user,
            topic: topicRef.current.value,
            content: contentRef.current.value,
            likes: [],
            comments: []
        };

        fetch("https://social-media-server-z7vw.onrender.com/upload", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(post)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setRefetch(!refetch);
                    topicRef.current.value = "";
                    contentRef.current.value = "";
                } else {
                    alert(result.message);
                }
            });
    }

    return (
        <div className="flex upload">
            <div className="upload__container">
                <div
                    className="flex"
                    style={{ justifyContent: "space-between" }}
                >
                    <p>Welcome {user.username}</p>
                    <Link to={"/"}>Log out</Link>
                </div>
                <input type="text" placeholder="Topic" ref={topicRef} />
                <textarea type="text" placeholder="Content" ref={contentRef} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default Upload;
