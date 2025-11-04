import React from "react";
import { CartProducts } from "../components/cart/CartProducts";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Ticket = () => {
    const { cart, removeFromCart, totalCost, clearCart } = useCart();

    const navigate = useNavigate();

    const handlePay = () => {
        navigate("/dashboard");
        clearCart();
    };

    const today = new Date();

    // Formatear la fecha en formato "DD/MM/YYYY"
    const config = { year: "numeric", month: "numeric", day: "numeric" };
    const today_Date = today.toLocaleDateString("es-ES", config);

    return (
        <div className="container p-5">
            <h4 className="text-center mb-5">¡Su compra ha sido realizada!</h4>

            <p className="fw-bold">
                Distribuidor: <span className="fw-normal fs-5">B-you</span>
            </p>

            <p className="fw-bold">
                Contacto:{" "}
                <span className="fw-normal fs-5">basto3107@gmail.com</span>
            </p>

            <p className="fw-bold">
                Fecha: <span className="fw-normal fs-5">{today_Date}</span>
            </p>

            <CartProducts
                products={cart}
                removeProduct={removeFromCart}
                calculateTotal={totalCost}
                emptyCart={clearCart}
            ></CartProducts>
            <p className="fw-light fs-6">
                Tiene un periodo para realizar el rembolzo de 30 dias. Asegurese
                de evitar dañar las etiquetas y el producto. Para más
                informacion comuniquese con nosotros
            </p>
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-outline-success mt-3"
                    onClick={handlePay}
                >
                    Seguir comprando
                </button>
            </div>
        </div>
    );
};
