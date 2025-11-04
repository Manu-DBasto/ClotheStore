import multer from "multer"; //Facilita el manejo de archivos
import path from "path"; //Facilita trabajar con rutas y archivos del proyecto
import { fileURLToPath } from "url"; //permite obtener la tura de este archivo
import fs from "fs"; //Permite que podamos interactuar con archivos del sistema

//obtener raiz del proyecto
const __filename = fileURLToPath(import.meta.url); //permite convertir la direccion web interna del archivo en una ruta que el sistema puede procesar
const __dirname = path.dirname(__filename); //Usa path para extraer la carpeta de este archivo con su ruta
const uploadDir = path.join(__dirname, "../../public/images/products"); //sirve para definir la ruta en la que se encuentra este codigo y la ruta donde se guardarán las imagenes.

//crear carpeta si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//configuracion para el almacenamiento de imagenes
const storage = multer.diskStorage({
    //esta funcion establece que queremos guardar algun archivo en el disco
    destination: (req, file, cb) => {
        // se dan los parametros para la configuracion del destino, la peticion, el archivo, y una funcion para usar con los datos .
        cb(null, uploadDir); // Con esta funcion declaramos que no hay errores y que la carpeta de destino es la establecida anteriormente
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); //Nos permite dar un sufijo para el nombre, unico al archivo. Usando la fecha y hora combinado a un numero grande.
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Establece que no hubo errores y que el nombre del archivo será el sufijo con la extension original del archivo.
    },
});

//filtrar solo imagenes

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("El formato del archivo es incorrecto"), false);
    }
};

const upload = multer({ storage, fileFilter }); // Se crea la instancia de multer pasandole las configuraciones de guardado y el filtrado de imagenes.

export default upload; //Se exporta como funcion para usarse en la api
