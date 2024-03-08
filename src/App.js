import React from "react";
import Login from "./component/Login";
import Registration from "./component/Registration";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import ForgotPassword from "./component/ForgotPassword";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path={"/"} element={<Login />}></Route>
                <Route
                    path={"/registration"}
                    element={<Registration />}
                ></Route>
                <Route path={"/home"} element={<Home />}></Route>
                <Route
                    path={"/forgot-password"}
                    element={<ForgotPassword />}
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
