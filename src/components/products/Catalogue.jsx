import React from "react";
import styles from "../../styles/catalogue.module.css";
import { useCart } from "../../context/CartContext";
export const Catalogue = ({ products = [] }) => {
    const { addToCart } = useCart();

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
                <div className="col" key={product.product_id}>
                    <div className={`card ${styles.cardStyles}`}>
                        <div
                            style={{ backgroundImage: `url(${product.image})` }}
                            className={`card-img-top ${styles.imageProd}`}
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                {product.product_name}
                            </h5>
                            <p className="card-text fw-light fs-4 text-end">{`$${product.price}`}</p>
                            <div className="d-flex-justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => addToCart(product)}
                                >
                                    <i className="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
