import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer"; // Nuevo: Para subir imágenes
import upload from "./middleware/upload.js";

import {
    getUsers,
    createUser,
    logUser,
    updateUser,
    deleteUser,
    getUserByEmail,
} from "./routes/user.js";
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from "./routes/products.js";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const corsOptions = {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permite estos métodos
};

app.use(cors(corsOptions));

//USERS
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo a los usuarios" });
    }
});

app.post("/getUserByEmail", async (req, res) => {
    console.log("hola");
    try {
        const { email } = req.body;
        console.log(email);
        const user = await getUserByEmail(email);
        res.status(200).json({
            message:
                "Su usuario ha sido encontrado. Su contraseña ha sido enviada, revise su bandeja de correo.",
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error, message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await logUser(email, password);
        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            user,
        });
    } catch (error) {
        console.error("Endpoint /login error:", error);

        res.status(500).json({
            error: error,
            message: error.message,
        });
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ error: "Los datos enviados no estan completos." });
        }

        const user = await createUser(username, email, password);
        res.status(201).json({
            message: "Usuario registrado exitosamente.",
            user,
        });
    } catch (error) {
        console.error("Endpoint /signup error:", error);

        res.status(500).json({
            error: error,
            message: error.message,
        });
    }
});

app.put("/updateUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { formState } = req.body;

        const { username, email, role } = formState;

        if (!username || !email || !role) {
            return res
                .status(400)
                .json({ error: "Los datos enviados no estan completos." });
        }

        const user = await updateUser(id, username, email, role);
        res.status(201).json({
            message: "Usuario actualizado exitosamente.",
            user,
        });
    } catch (error) {
        console.error("Endpoint /updateUser error:", error);

        res.status(500).json({
            error: error,
            message: error.message,
        });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await deleteUser(id);
        res.status(201).json({
            message: "Usuario actualizado exitosamente.",
            user,
        });
    } catch (error) {
        console.error("Endpoint /deleteUser error:", error);

        res.status(500).json({
            error: error,
            message: error.message,
        });
    }
});

//PRODUCTS
app.get("/products", async (req, res) => {
    try {
        // Obtener el término de búsqueda y convertirlo
        const search = req.query.search || "";
        let normalizedSearch;

        switch (search.toLowerCase()) {
            case "hombre":
            case "varón":
                normalizedSearch = "man";
                break;
            case "mujer":
            case "dama":
                normalizedSearch = "women";
                break;
            case "niños":
            case "niñas":
                normalizedSearch = "kids";
                break;
            default:
                normalizedSearch = search; // Mantener el término original si no hay coincidencias
                break;
        }

        const products = await getProducts(normalizedSearch);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).json({
            error: error,
            message:
                "Ocurrió un error obteniendo los productos. Intente más tarde." +
                error.message,
        });
    }
});

app.post("/createProduct", upload.single("image"), async (req, res) => {
    // establece que se usará el middleware y la funcion, ademas de que espete un solo archivo llamado image. Procesando primero el archivo antes que la consulta misma
    try {
        const { product_name, price, tags } = req.body;
        const imagePath = req.file
            ? `/images/products/${req.file.filename}` //se declara la ruta en donde estan alojadas las imagenes
            : null;

        if (!product_name || !price || !imagePath) {
            return res
                .status(400)
                .json({ message: "Faltan datos requeridos." });
        }

        const product = await createProduct(
            product_name,
            price,
            imagePath,
            tags
        );
        res.status(201).json({
            message: "Producto registrado con éxito",
            product,
        });
    } catch (error) {
        console.error("Error en /createProducts:", error);
        res.status(500).json({
            error: error,
            message: "Error registrando el producto:" + error.message,
        });
    }
});

app.put("/updateProduct", upload.single("image"), async (req, res) => {
    try {
        const { product_id, product_name, price, tags_changed } = req.body;
        let tagsr = req.body.tags || [];
        // Verificar datos mínimos requeridos
        if (!product_id || !product_name || !price) {
            return res
                .status(400)
                .json({ message: "Faltan datos requeridos." });
        }

        // Obtener tags si cambiaron
        let tags =
            tags_changed === "true"
                ? Array.isArray(req.body.tags)
                    ? req.body.tags
                    : [req.body.tags]
                : null;

        if (tags !== null) {
            tags = tags
                .map((tag) => Number(tag))
                .filter((tag) => !isNaN(tag) && tag > 0);
        }

        console.log(tags);
        // Procesar imagen si se envió una nueva
        const imagePath = req.file
            ? `/images/products/${req.file.filename}`
            : null;

        // Llamar a la función de actualización
        const updatedProduct = await updateProduct(
            product_id,
            product_name,
            price,
            imagePath,
            tags
        );

        res.status(200).json({
            message: "Producto actualizado con éxito",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error en /updateProduct:", error);
        res.status(500).json({
            error: error.message,
            message: "Error actualizando el producto",
        });
    }
});

app.delete("/deleteProduct/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.log("Error deleting product: ", error);
        res.status(500).json({
            error: error.message,
            message: "Error eliminando el producto",
        });
    }
});

app.listen(port, () => {
    console.log(`Server jalando en puerto ${port}`);
});
