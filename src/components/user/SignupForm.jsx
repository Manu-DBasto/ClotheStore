import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
    const [result, setresult] = useState({
        status: null,
        message: null,
    });

    const intialForm = {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
    };
    const { formState, onInputChange } = useForm(intialForm);
    const { username, email, password, password_confirm } = formState;

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password_confirm) {
            return alert("Las contraseñas ingresadas no coinciden.");
        }

        try {
            const response = await fetch("http://localhost:3100/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
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
                navigate("/");
            } else {
                setresult({
                    status: "error",
                    message: data.message,
                });
                console.log(data);
            }
        } catch (error) {
            setresult({
                status: "error",
                message: "Algo salió mal. Intente de nuevo más tarde.",
            });
            console.log(error);
        }
    };

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                {result.status === "error" ? (
                    <div class="alert alert-danger" role="alert">
                        {result.message}
                    </div>
                ) : result.status == "success" ? (
                    <div class="alert alert-success" role="alert">
                        {result.message}
                    </div>
                ) : (
                    ""
                )}

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={onInputChange}
                        required
                        autoComplete="off"
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="password_confirm" className="form-label">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password_confirm"
                        value={password_confirm}
                        onChange={onInputChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>
                </div>
            </form>
        </>
    );
};
