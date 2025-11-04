import React, { useState } from "react";

const ContactPicker = () => {
    const [contacts, setContacts] = useState([]);
    const [isSupported, setIsSupported] = useState("Checking...");

    // Verifica si el navegador soporta la API al montar el componente
    useState(() => {
        if ("contacts" in navigator && "select" in navigator.contacts) {
            setIsSupported("Supported");
        } else {
            setIsSupported("Not Supported");
        }
    }, []);

    const getContacts = async () => {
        if (isSupported !== "Supported") {
            alert("Tu navegador no soporta la Contact Picker API.");
            return;
        }

        // Propiedades que deseas solicitar (pueden ser 'name', 'email', 'tel', 'address', 'icon')
        const properties = ["name", "tel"];
        const options = { multiple: true }; // Permite seleccionar múltiples contactos

        try {
            // Abre el selector de contactos
            const selectedContacts = await navigator.contacts.select(
                properties,
                options
            );
            setContacts(selectedContacts);
            console.log("Contactos seleccionados:", selectedContacts);
        } catch (error) {
            console.error("Error al seleccionar contactos:", error);
            alert(
                "Ocurrió un error al intentar abrir el selector de contactos."
            );
        }
    };

    return (
        <div>
            <h3>Selector de Contactos 📱</h3>
            <p>
                Soporte de la API: <strong>{isSupported}</strong>
            </p>

            <button
                onClick={getContacts}
                disabled={isSupported !== "Supported"}
            >
                Seleccionar Contactos
            </button>

            {/* Muestra los contactos seleccionados */}
            {contacts.length > 0 && (
                <>
                    <h4>Contactos Obtenidos:</h4>
                    <ul>
                        {contacts.map((contact, index) => (
                            <li key={index}>
                                <strong>Nombre:</strong>{" "}
                                {contact.name ? contact.name.join(", ") : "N/A"}
                                <br />
                                <strong>Teléfono:</strong>{" "}
                                {contact.tel ? contact.tel.join(", ") : "N/A"}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ContactPicker;
