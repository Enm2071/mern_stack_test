import React from "react";
import httpClient from "../api/http.client";

const useLogin = () => {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const login = async () => {
        try {
            setLoading(true);
            const response = await httpClient.post("/auth/sign-in", {
                email,
                password,
            });
            const { data } = response;           
            localStorage.setItem("token", data.token);
            return data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
        }
    };

    return { loading, login, setEmail, email, setPassword, password, error, logOut };
};

export default useLogin;