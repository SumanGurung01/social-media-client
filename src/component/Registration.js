import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Global";
import "../styles/Registration.css";

function Registration() {
    const navigate = useNavigate();
    const { setUser } = useContext(Context);

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    function handleRegister() {
        const credential = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        fetch("https://social-media-server-z7vw.onrender.com/registration", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(credential)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    sessionStorage.setItem("user", JSON.stringify(result.user));
                    setUser(result.user);
                    navigate("/home");
                } else {
                    alert(result.message);
                }
            });
    }

    return (
        <div className="registration flex">
            <div className="registration__container">
                <p>Registration</p>
                <input type="text" placeholder="Email" ref={emailRef} />
                <input type="text" placeholder="Username" ref={usernameRef} />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <button onClick={handleRegister}>Register</button>
                <Link to={"/"}>back to login</Link>
            </div>
        </div>
    );
}

export default Registration;
