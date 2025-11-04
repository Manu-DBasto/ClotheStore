import React, { useEffect, useState } from "react";

import styles from "../styles/ProductsCrud.module.css";
import { DefaultLayout } from "../layout/DefaultLayout";
import { useForm } from "../hooks/useEnhancedForm";
import { useFetch } from "../hooks/useFetch";

import { UserModal } from "../components/user/UserModal";
import { UserTable } from "../components/user/UserTable";
import { ResultToast } from "../components/products/ResultToast";

import { useAuth } from "../auth/AuthProvider";

export const Users = () => {
    const [reload, setReload] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [result, setResult] = useState({ status: null, message: null });

    const initialForm = {
        username: "",
        email: "",
        role: "",
    };

    const { formState, onInputChange, refreshForm } = useForm(initialForm);
    const { data, isLoading, errors } = useFetch(
        "http://localhost:3100/users",
        reload
    );

    const onEditUser = async (event) => {
        event.preventDefault();
        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        try {
            const response = await fetch(
                `http://localhost:3100/updateUser/${selectedUser.user_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        formState,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setResult({ status: "success", message: data.message });
                setReload(!reload);
            } else {
                setResult({ status: "error", message: data.message });
            }
            refreshForm(initialForm);
            toastBootstrap.show();
        } catch (error) {
            setResult({
                status: "error",
                message: "Algo salio mal. Intente de nuevo más tarde.",
            });
            console.error("Error al enviar el producto:", error);
            toastBootstrap.show();
        }
    };

    const onDeleteUser = async (id) => {
        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        if (!window.confirm("¿Seguro que quieres eliminar a este usuario?"))
            return;

        try {
            const response = await fetch(
                `http://localhost:3100/deleteUser/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();
            if (response.ok) {
                setResult({ status: "success", message: data.message });
                setReload(!reload);
            } else {
                setResult({ status: "error", message: data.message });
            }
            toastBootstrap.show();
        } catch (error) {
            console.error("Error eliminando usuario:", error, error.message);
        }
    };

    const handleEditUser = (user) => {
        console.log(user);

        setSelectedUser(user);

        refreshForm({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    };

    return (
        <DefaultLayout>
            <div className={`container ${styles.productContainer}`}>
                <ResultToast status={result.status} message={result.message} />

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <div
                            className="spinner-border text-secondary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : errors ? (
                    <div className="alert alert-danger" role="alert">
                        {errors}
                    </div>
                ) : (
                    <UserTable
                        users={data}
                        onEdit={handleEditUser}
                        onDelete={onDeleteUser}
                    />
                )}

                <UserModal
                    selectedUser={selectedUser}
                    formState={formState}
                    onInputChange={onInputChange}
                    onSubmit={onEditUser}
                    refresh={() => refreshForm(initialForm)}
                />
            </div>
        </DefaultLayout>
    );
};
