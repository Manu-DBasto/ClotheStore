import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export const RouteProtection = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const AdminProtection = () => {
    const { user } = useAuth();

    return user.role === "admin" ? (
        <Outlet />
    ) : user.role === "seller" ? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard" />
    );
};
