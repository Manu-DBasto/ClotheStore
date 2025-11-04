import React from "react";

export const CartProducts = ({
    products,
    removeProduct,
    calculateTotal,
    emptyCart,
}) => {
    return (
        <>
            <div className={`border rounded overflow-hidden`}>
                <table className={`table mb-0`}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th className="">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.product_id}>
                                <td>{item.product_name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td className="fw-medium fs-5">
                                    ${item.price * item.quantity}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className={`text-right`}>
                                <strong>Total:</strong>
                            </td>
                            <td>
                                <h4>${calculateTotal()}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
