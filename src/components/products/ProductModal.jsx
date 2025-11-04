import React, { useRef } from "react";

export const ProductModal = ({
    selectedProduct,
    formState,
    onInputChange,
    onSubmit,
    refresh,
}) => {
    const fileInputRef = useRef(null);
    const handleSubmit = (e) => {
        onSubmit(e);
        // Resetear el input file después del envío
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClose = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        refresh();
    };

    return (
        <div
            className="modal"
            tabIndex="-1"
            id="productModal"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Producto</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label
                                    htmlFor="product_name"
                                    className="form-label"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Camiseta roja de algodón"
                                    id="product_name"
                                    value={formState.product_name}
                                    onChange={onInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="00.00"
                                    id="price"
                                    value={formState.price}
                                    onChange={onInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="formFile"
                                    className="form-label"
                                >
                                    Inserte su imagen.
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={onInputChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            {selectedProduct ? (
                                <div>
                                    <h6>Imagen actual del producto</h6>
                                    <img
                                        src={selectedProduct.image}
                                        className="border"
                                        height={200}
                                    ></img>
                                </div>
                            ) : (
                                ""
                            )}

                            <hr />

                            <h6>Seleccione las categorias del producto</h6>
                            <div className="form-check form-check-inline">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="formal"
                                        value={1}
                                        onChange={onInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="formal"
                                    >
                                        Formal
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="kids"
                                        value={3}
                                        onChange={onInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="kids"
                                    >
                                        Niños
                                    </label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="casual"
                                        value={2}
                                        onChange={onInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="casual"
                                    >
                                        Casual
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="men"
                                        value={4}
                                        onChange={onInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="men"
                                    >
                                        Hombre
                                    </label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="women"
                                        value={5}
                                        onChange={onInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="women"
                                    >
                                        Mujer
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                data-bs-dismiss="modal"
                                className="btn btn-success"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
