import React, { useEffect, useState } from "react";

import styles from "../styles/ProductsCrud.module.css";
import { DefaultLayout } from "../layout/DefaultLayout";
import { useForm } from "../hooks/useEnhancedForm";
import { useFetch } from "../hooks/useFetch";
import { ProductModal } from "../components/products/ProductModal";
import { ProductTable } from "../components/products/ProductTable";
import { ResultToast } from "../components/products/ResultToast";

import { useAuth } from "../auth/AuthProvider";

export const Products = () => {
    const [reload, setReload] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [result, setResult] = useState({ status: null, message: null });

    const { user } = useAuth();

    const initialForm = {
        product_name: "",
        price: "",
        image: null,
        tags: [],
    };

    const { formState, onInputChange, refreshForm } = useForm(initialForm);
    const { data, isLoading, errors } = useFetch(
        "http://localhost:3100/products",
        reload
    );

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const onCreateProduct = async (event) => {
        event.preventDefault();

        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        const formData = new FormData();
        formData.append("product_name", formState.product_name);
        formData.append("price", formState.price);
        formData.append("image", formState.image);

        formState.tags.forEach((tag) => {
            formData.append("tags[]", tag);
        });

        try {
            const response = await fetch(
                "http://localhost:3100/createProduct",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                setResult({ status: "success", message: data.message });
                setReload(!reload);
            } else {
                setResult({ status: "error", message: data.message });
            }
            refreshForm(initialForm);
            toastBootstrap.show();
        } catch (error) {
            setResult({
                status: "error",
                message: "Algo salio mal. Intente de nuevo más tarde.",
            });
            console.error("Error al enviar el producto:", error);
            toastBootstrap.show();
        }
    };

    const onEditProduct = async (event) => {
        event.preventDefault();
        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        const formData = new FormData();
        formData.append("product_id", selectedProduct.product_id);
        formData.append("product_name", formState.product_name);
        formData.append("price", formState.price);

        if (formState.image) {
            formData.append("image", formState.image);
        }

        const normalizeTagIds = (tagIds) => {
            if (!tagIds) return [];
            if (Array.isArray(tagIds)) {
                return tagIds
                    .map((id) => Number(id))
                    .filter((id) => !isNaN(id) && id > 0);
            }
            return String(tagIds)
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((id) => !isNaN(id) && id > 0);
        };

        const originalTagIds = normalizeTagIds(selectedProduct.tag_ids);
        const currentTagIds = normalizeTagIds(formState.tags);

        const arraysEqual = (a, b) =>
            a.length === b.length &&
            a.every((id) => b.includes(id)) &&
            b.every((id) => a.includes(id));

        const tagsChanged = !arraysEqual(originalTagIds, currentTagIds);

        if (tagsChanged && currentTagIds.length > 0) {
            currentTagIds.forEach((tagId) => {
                if (tagId > 0) formData.append("tags[]", tagId);
            });
            formData.append("tags_changed", "true");
        } else {
            formData.append("tags_changed", "false"); // 👈 Previene intentos de update vacíos
        }

        try {
            const response = await fetch(
                "http://localhost:3100/updateProduct",
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                setResult({ status: "success", message: data.message });
                setReload(!reload);
                setSelectedProduct(null);
            } else {
                setResult({ status: "error", message: data.message });
            }

            refreshForm(initialForm);
            toastBootstrap.show();
        } catch (error) {
            setResult({
                status: "error",
                message: "Error al actualizar el producto",
            });
            console.error("Error al actualizar producto:", error);
            toastBootstrap.show();
        }
    };

    const onDeleteProduct = async (id) => {
        const toastLiveExample = document.getElementById("resultToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        if (!window.confirm("¿Seguro que quieres eliminar este producto?"))
            return;

        try {
            const response = await fetch(
                `http://localhost:3100/deleteProduct/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();
            if (response.ok) {
                setResult({ status: "success", message: data.message });
                setReload(!reload);
            } else {
                setResult({ status: "error", message: data.message });
            }
            toastBootstrap.show();
        } catch (error) {
            console.error("Error eliminando producto:", error, error.message);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);

        refreshForm({
            product_name: product.product_name,
            price: product.price,
            image: null, // No pre-cargamos la imagen por seguridad
            tags: product.tags || [], // Asumiendo que tu API devuelve los tags
        });
    };

    const handleSubmit = (event) => {
        if (selectedProduct) {
            onEditProduct(event);
        } else {
            onCreateProduct(event);
        }
    };

    return (
        <DefaultLayout>
            <div className={`container ${styles.productContainer}`}>
                <ResultToast status={result.status} message={result.message} />
                {user.role !== "admin" ? null : (
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#productModal"
                            onClick={() => {
                                setSelectedProduct(null);
                            }}
                        >
                            Agregar producto
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <div
                            className="spinner-border text-secondary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : errors ? (
                    <div className="alert alert-danger" role="alert">
                        {errors}
                    </div>
                ) : (
                    <ProductTable
                        products={data}
                        onEdit={handleEditProduct}
                        onDelete={onDeleteProduct}
                        formatCurrency={formatCurrency}
                    />
                )}

                <ProductModal
                    selectedProduct={selectedProduct}
                    formState={formState}
                    onInputChange={onInputChange}
                    onSubmit={handleSubmit}
                    refresh={() => refreshForm(initialForm)}
                />
            </div>
        </DefaultLayout>
    );
};
