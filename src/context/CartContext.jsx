import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        return storedCart;
    });
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.product_id === product.product_id
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((p) => p.product_id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalCost = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, totalCost }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
