import React, { useEffect, useState } from "react";

export const useFetch = (url, reloadDependency) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        errors: null,
    });

    const getFetch = async () => {
        if (!url) return;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setState({
                    data: data,
                    isLoading: false,
                    errors: null,
                });
            } else {
                setState({
                    data: null,
                    isLoading: false,
                    errors: data.message,
                });
            }
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                errors: error.message || "Error desconocido", //Agregue un fallback
            });
        }
    };

    useEffect(() => {
        getFetch();
        console.log("reloaded");
    }, [url, reloadDependency]); // Añadimos reloadDependency como dependencia

    return {
        data: state.data,
        isLoading: state.isLoading,
        errors: state.errors,
    };
};
