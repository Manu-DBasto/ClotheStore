import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import styles from "../styles/navbar.module.css";

export const DefaultLayout = ({ children }) => {
    const { logout, user } = useAuth();
    const offcanvasRef = useRef(null);

    const onClickLogout = () => {
        logout();
    };

    // Función para cerrar el Offcanvas
    const closeOffcanvas = () => {
        if (offcanvasRef.current) {
            // Accedemos al Offcanvas a través del objeto global bootstrap
            const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(
                offcanvasRef.current
            );
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            } else {
                // Si no existe la instancia, la creamos y luego la ocultamos
                new window.bootstrap.Offcanvas(offcanvasRef.current).hide();
            }
        }
    };

    return (
        <>
            <header className="d-flex align-items-center justify-content-between p-2 border-bottom">
                {/* Botón de menú (offcanvas) */}
                <div>
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>

                {/* Título de la app */}
                <h3 className="m-0">
                    <span className="text-danger">
                        <i className="fa-brands fa-slack m-2"></i>
                    </span>
                    B-You
                    <span className="text-muted fs-6 fw-medium"> rself</span>
                </h3>

                {/* Botón de carrito */}
                <div>
                    <Link
                        className="btn btn-warning"
                        to="/cart"
                        onClick={closeOffcanvas}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
            </header>

            {/* Sidebar Offcanvas */}
            <div
                ref={offcanvasRef}
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="sidebarMenu"
                aria-labelledby="sidebarMenuLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">
                        <span className="text-danger">
                            <i className="fa-brands fa-slack m-2"></i>
                        </span>
                        B-You{" "}
                        {user.role === "client" ? null : (
                            <span className="fs-6 fw-light">
                                version - {user.role}
                            </span>
                        )}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <nav>
                        <ul className="nav flex-column gap-3">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active text-dark fs-5"
                                    aria-current="page"
                                    to={"/dashboard"}
                                    onClick={closeOffcanvas}
                                >
                                    <i className="fa-solid fa-house"></i>
                                    <span className="fw-bold">
                                        {"  "}Inicio
                                    </span>
                                </Link>
                            </li>

                            {user.role !== "client" ? (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle fw-medium fs-5 text-dark"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa-solid fa-unlock"></i>
                                        <span className="fw-bold">
                                            {"  "}Administrar
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={"/products"}
                                                onClick={closeOffcanvas}
                                            >
                                                Productos
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={"/users"}
                                                onClick={closeOffcanvas}
                                            >
                                                Usuarios
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            ) : null}
                        </ul>
                    </nav>
                </div>
                <button
                    className="btn btn-danger rounded-0"
                    onClick={() => {
                        onClickLogout();
                        closeOffcanvas();
                    }}
                >
                    Cerrar sesión
                </button>
            </div>

            <main>{children}</main>
        </>
    );
};
