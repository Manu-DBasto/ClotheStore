import React from "react";
import { Link } from "react-router-dom";

import { SignupForm } from "../components/user/SignupForm";

import styles from "../styles/LoginRegister.module.css";
import { useAuth } from "../auth/AuthProvider";

export const SignUp = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <>
            <div className={`container ${styles.cont} `}>
                <div className={`card p-5 ${styles.formContainer}`}>
                    <h1 className="text-center">Registrarse</h1>
                    <SignupForm />
                    <p className="text-center">
                        Ya tiene cuenta?{" "}
                        <span className="text-primary">
                            <Link to={"/"}>Inicie sesion.</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};
