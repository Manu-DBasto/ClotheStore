import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

import { Dashboard } from "./routes/Dashboard";
import { SignUp } from "./routes/SignUp";
import { Login } from "./routes/Login";
import { Products } from "./routes/Products";
import { Users } from "./routes/User";
import { Cart } from "./routes/Cart";
import { Ticket } from "./routes/Ticket";
import { PasswordRecover } from "./routes/PasswordRecover";
import ContactPicker from "./routes/ContactPicker";
import { Camera } from "./routes/Camera";

import { RouteProtection } from "./routes/RouteProtection";
import { AdminProtection } from "./routes/RouteProtection";
import { AuthProvider } from "./auth/AuthProvider";

import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/password-recover",
        element: <PasswordRecover />,
    },
    {
        path: "/contacts",
        element: <ContactPicker />,
    },
    {
        path: "/camera",
        element: <Camera />,
    },
    {
        path: "/",
        element: <RouteProtection />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/",
                element: <AdminProtection />,
                children: [
                    {
                        path: "/products",
                        element: <Products />,
                    },
                    {
                        path: "/users",
                        element: <Users />,
                    },
                ],
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/ticket",
                element: <Ticket />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
