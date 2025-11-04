import React from "react";

export const ResultToast = ({ status, message }) => {
    return (
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div
                className="toast align-items-center text-bg-secondary overflow-hidden border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                id="resultToast"
            >
                {status === "error" ? (
                    <div className="d-flex">
                        <div className="toast-body bg-danger">{message}</div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                ) : status == "success" ? (
                    <div className="d-flex bg-success">
                        <div className="toast-body">{message}</div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
