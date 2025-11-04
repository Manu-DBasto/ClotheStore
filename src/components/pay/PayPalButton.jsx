import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const PayPalButton = () => {
    const { totalCost, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AfaH5SwDb7uwa5mg7_lzBnNoLNRc_UR_5cCHRB-PN5dCRQZgyRAlX8D-GTiFwG9ZQybTFXG01bP0ISM7", // Reemplaza con tu client ID
                currency: "USD",
            }}
        >
            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "pill",
                    label: "pay",
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: totalCost().toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        console.log("Pago exitoso:", details);
                        navigate("/ticket");
                    });
                }}
                onCancel={(data) => {
                    console.log("Pago cancelado:", data);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
