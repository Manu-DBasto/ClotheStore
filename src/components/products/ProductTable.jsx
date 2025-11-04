import React from "react";

export const ProductTable = ({
    products,
    onEdit,
    onDelete,
    formatCurrency,
}) => {
    return (
        <table className="table rounded overflow-hidden">
            <thead>
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.product_id}>
                        <td>{product.product_name}</td>
                        <td>${formatCurrency(product.price)}</td>
                        <td>
                            <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#productModal"
                                onClick={() => onEdit(product)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(product.product_id)}
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
