import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    const signin = (nickname) => {
        setUser({nickname});
        console.log("Passou no Signin!");
        return;
    }

    const signout = () => {
        setUser(null);
        console.log("Passou no Signout!");
        return;
    }

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signout, signin }}
        >
            {children}
        </AuthContext.Provider>
    );
};