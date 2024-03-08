import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Context } from "../context/Global";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(Context);
    const usernameRef = useRef();
    const passwordRef = useRef();

    function handleLogin() {
        const credential = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        fetch("https://social-media-server-z7vw.onrender.com/login", {
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
        <div className="login flex">
            <div className="login__container">
                <p>Login</p>
                <input type="text" placeholder="Username" ref={usernameRef} />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <button onClick={handleLogin}>Login</button>
                <Link to={"/registration"}>register now</Link>
                <Link to={"/forgot-password"}>forgot password</Link>
            </div>
        </div>
    );
}

export default Login;
