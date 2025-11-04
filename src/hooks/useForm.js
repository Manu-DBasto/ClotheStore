import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm); //valores del formulario

    const onInputChange = ({ target }) => {
        const { id, value } = target;
        setFormState({
            ...formState,
            [id]: value,
        });
    };

    const refreshForm = () => {
        setFormState(initialForm);
    };

    return {
        formState,
        onInputChange,
        refreshForm,
    };
};
