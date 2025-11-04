import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../auth/AuthProvider";

export const LoginForm = () => {
    const navigate = useNavigate();

    const [result, setresult] = useState({
        status: null,
        message: null,
    });

    const { login } = useAuth();

    const initialForm = {
        email: "",
        password: "",
    };
    const { formState, onInputChange } = useForm(initialForm);
    const { email, password } = formState;

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3100/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setresult({
                    status: "success",
                    message: data.message,
                });
                login(data.user);
                navigate("/dashboard");
            } else {
                setresult({
                    status: "error",
                    message: data.message,
                });
            }
        } catch (error) {
            setresult({
                status: "error",
                message: "Algo salio mal. Intente de nuevo más tarde.",
            });
            console.log(error);
        }
    };

    return (
        <form className="form" onSubmit={onSubmit}>
            {result.status === "error" ? (
                <div className="alert alert-danger" role="alert">
                    {result.message}
                </div>
            ) : result.status == "success" ? (
                <div className="alert alert-success" role="alert">
                    {result.message}
                </div>
            ) : (
                ""
            )}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={onInputChange}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={onInputChange}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
};
