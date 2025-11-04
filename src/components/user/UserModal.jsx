import React, { useRef, useState } from "react";

export const UserModal = ({
    selectedUser,
    formState,
    onInputChange,
    onSubmit,
    refresh,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    const handleClose = () => {
        refresh();
    };
    return (
        <div
            className="modal"
            tabIndex="-1"
            id="productModal"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Usuario</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label
                                    htmlFor="product_name"
                                    className="form-label"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Camiseta roja de algodón"
                                    id="username"
                                    value={formState.username}
                                    onChange={onInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo electrónico
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Camiseta roja de algodón"
                                    id="email"
                                    value={formState.email}
                                    onChange={onInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">
                                    Rol
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={formState.role || "client"}
                                    onChange={onInputChange}
                                    id="role"
                                >
                                    <option value="client">Cliente</option>
                                    <option value="seller">Vendedor</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                data-bs-dismiss="modal"
                                className="btn btn-success"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
