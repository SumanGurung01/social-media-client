import React, { useRef } from "react";
import "../styles/ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    function handleReset() {
        const credential = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            newPassword: passwordRef.current.value
        };

        fetch("https://social-media-server-z7vw.onrender.com/forgotpassword", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(credential)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    alert(result.message);
                    navigate("/");
                } else {
                    alert(result.message);
                }
            });
    }

    return (
        <div className="forgot-password flex">
            <div className="forgot-password__container">
                <p>Password Reset</p>
                <input type="text" placeholder="Email" ref={emailRef} />
                <input type="text" placeholder="Username" ref={usernameRef} />
                <input
                    type="password"
                    placeholder="New Password"
                    ref={passwordRef}
                />
                <button onClick={handleReset}>Register</button>
                <Link to={"/"}>back to login</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
