import React from "react";

export const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <table className="table rounded overflow-hidden">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.user_id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#productModal"
                                onClick={() => onEdit(user)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(user.user_id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
