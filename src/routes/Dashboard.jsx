import React, { useEffect, useState } from "react";

import { DefaultLayout } from "../layout/DefaultLayout";
import { Catalogue } from "../components/products/Catalogue";
import { useFetch } from "../hooks/useFetch";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

import styles from "../styles/catalogue.module.css";

export const Dashboard = () => {
    const {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    const [search, setSearch] = useState("");
    const onInputChange = (event) => {
        setSearch(event.target.value);
    };

    const onSelect = (category) => {
        setSearch(category);
    };

    const { data, isLoading, errors } = useFetch(
        `http://localhost:3100/products?search=${search}`,
        search
    );

    useEffect(() => {
        if (text) {
            setSearch(text);
        }
    }, [text]);

    return (
        <>
            <DefaultLayout>
                <div className={`container ${styles.productContainer}`}>
                    <div className="d-flex justify-content-end gap-2">
                        <div className="d-flex">
                            <input
                                className={`form-control ${styles.searchInput}`}
                                type="text"
                                placeholder="Buscar..."
                                id="search"
                                value={search}
                                onChange={onInputChange}
                                autoComplete="off"
                            />

                            {isListening ? (
                                <button
                                    className={`btn btn-dark text-danger ${styles.micButton}`}
                                    onClick={stopListening}
                                >
                                    <i className="fa-solid fa-microphone-slash"></i>
                                </button>
                            ) : (
                                <button
                                    className={`btn btn-dark text-danger ${styles.micButton}`}
                                    onClick={startListening}
                                >
                                    <i className="fa-solid fa-microphone"></i>
                                </button>
                            )}
                        </div>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Filtros
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect("hombre");
                                        }}
                                    >
                                        Caballero
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect("dama");
                                        }}
                                    >
                                        Dama
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect("niños");
                                        }}
                                    >
                                        Infantil
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect("casual");
                                        }}
                                    >
                                        Casual
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect("formal");
                                        }}
                                    >
                                        Formal
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : errors ? (
                        <div className="alert alert-danger" role="alert">
                            {errors}
                        </div>
                    ) : (
                        <Catalogue products={data} />
                    )}
                </div>
            </DefaultLayout>
        </>
    );
};
