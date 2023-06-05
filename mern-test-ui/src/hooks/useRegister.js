import React from "react";
import httpClient from "../api/http.client";

const useRegister = () => {
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const register = async () => {
        try {
            setLoading(true);
            const response = await httpClient.post("/auth/sign-up", {
                name,
                email,
                password,
            });
            const { data } = response;
            return data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register, setEmail, email, setPassword, password, setName, name, error };
};

export default useRegister;