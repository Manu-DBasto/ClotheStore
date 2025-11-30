import React, { use } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { LoginForm } from "../components/user/LoginForm";

import styles from "../styles/LoginRegister.module.css";

import { useAuth } from "../auth/AuthProvider";

export const Login = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <>
            <div className={`container ${styles.cont} `}>
                <div className={`card p-5 ${styles.formContainer}`}>
                    <h1 className="text-center">Iniciar sesion</h1>
                    <LoginForm />
                    <p className="text-center m-0">
                        No tiene cuenta?{" "}
                        <span className="text-primary">
                            <Link to={"/signup"}>Registrese.</Link>
                        </span>
                    </p>
                    <p className="text-center">
                        Olvido su contraseña?{" "}
                        <span className="text-primary">
                            <Link to={"/password-recover"}>Recuperar.</Link>
                        </span>
                    </p>
                    <p className="text-center m-0">
                        Contactos{": "}
                        <span className="text-primary">
                            <Link to={"/contacts"}>Ver.</Link>
                        </span>
                    </p>
                    <p className="text-center m-0">
                        Camara{": "}
                        <span className="text-primary">
                            <Link to={"/camera"}>Ver.</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};
