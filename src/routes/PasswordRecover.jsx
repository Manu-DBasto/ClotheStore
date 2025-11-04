import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ResultToast } from "../components/products/ResultToast";

import styles from "../styles/LoginRegister.module.css";

export const PasswordRecover = () => {
    const [result, setResult] = useState({ status: null, message: null });

    const sendEmail = async (e) => {
        e.preventDefault();
        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        const email = e.target.email_from.value;

        try {
            const response = await fetch(
                "http://localhost:3100/getUserByEmail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok && data.user && data.user.length > 0) {
                e.target.message.value = data.user[0].password;

                const result = await emailjs.sendForm(
                    "service_2z7enxs",
                    "template_lwcb1my",
                    e.target,
                    "PZmZdVGP_SfJ51pp_"
                );
                setResult({ status: "success", message: data.message });
            } else {
                // alert(data.message || "El correo no se encuentra registrado.");
                setResult({ status: "error", message: data.message });
            }
            toastBootstrap.show();
        } catch (error) {
            console.error("Error en la recuperación:", error);
            setResult({
                status: "error",
                message: "No ha sido posible conectarse, intente más tarde.",
            });

            toastBootstrap.show();
        }
    };

    return (
        <div className={`container ${styles.cont}`}>
            <ResultToast status={result.status} message={result.message} />

            <div className={`card p-5 ${styles.formContainer}`}>
                <Link to="/">
                    <p className="mb-3">{"< "}Volver</p>
                </Link>
                <h1 className="text-center">Recuperar contraseña</h1>
                <form className="d-flex flex-column" onSubmit={sendEmail}>
                    <label htmlFor="email_from" className="mb-2">
                        Ingrese su correo electrónico para encontrar su cuenta
                    </label>
                    <input
                        type="text"
                        name="email_from"
                        className="rounded"
                        autoComplete="off"
                        required
                    />

                    <input type="hidden" name="message" />
                    <button className="btn btn-success mt-2" type="submit">
                        Recuperar contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};
