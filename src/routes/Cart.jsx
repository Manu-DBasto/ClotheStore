import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "../layout/DefaultLayout";
import { CartProducts } from "../components/cart/CartProducts";
import PayPalButton from "../components/pay/PayPalButton";

import { useCart } from "../context/CartContext";

import styles from "../styles/cart.module.css";

export const Cart = () => {
    const { cart, removeFromCart, totalCost, clearCart } = useCart();
    return (
        <DefaultLayout>
            <div className={`container ${styles.productContainer}`}>
                {cart.length < 0 ? (
                    <p>
                        Agregue productos a su carrito para poder comprarlos 😊{" "}
                    </p>
                ) : (
                    <div>
                        <Link to={"/dashboard"} className="mb-3">
                            <p>{"< "}Volver</p>
                        </Link>
                        <h4 className="mb-3">Carrito de compras</h4>
                        <CartProducts
                            products={cart}
                            removeProduct={removeFromCart}
                            calculateTotal={totalCost}
                            emptyCart={clearCart}
                        ></CartProducts>

                        <div className="d-grid mt-3 d-flex justify-content-center">
                            <PayPalButton></PayPalButton>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};
