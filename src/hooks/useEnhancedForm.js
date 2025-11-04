import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { id, value, type, checked, files } = target;

        if (type === "file") {
            setFormState({
                ...formState,
                [id]: files[0], // Solo guardamos el primer archivo
            });
        } else if (type === "checkbox") {
            setFormState({
                ...formState,
                tags: checked
                    ? [...(formState.tags || []), value]
                    : (formState.tags || []).filter((tag) => tag !== value),
            });
        } else {
            setFormState({
                ...formState,
                [id]: value,
            });
        }
    };

    const refreshForm = (values) => {
        setFormState(values);
    };

    return {
        formState,
        onInputChange,
        refreshForm,
    };
};
