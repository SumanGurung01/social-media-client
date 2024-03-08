import React, { createContext, useState } from "react";

export const Context = createContext();

function Global({ children }) {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    const [refetch, setRefetch] = useState(true);

    return (
        <Context.Provider value={{ user, setUser, refetch, setRefetch }}>
            {children}
        </Context.Provider>
    );
}

export default Global;
