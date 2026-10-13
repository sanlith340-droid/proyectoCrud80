const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { carpetaUploads } = require("../config/db");

// =====================================================
// CONFIGURACIÓN DE MULTER (subida de la imagen del producto)
// El campo del formulario se llama "imagen".
// =====================================================

// Crear la carpeta si no existe
if (!fs.existsSync(carpetaUploads)) {
    fs.mkdirSync(carpetaUploads, { recursive: true });
}

// Tipos permitidos y la extensión que le corresponde a cada uno.
// La extensión del archivo guardado sale de aquí, NO del nombre original
// que envía el cliente (así nadie guarda un ".html" disfrazado de imagen).
const extensionesPermitidas = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif"
};

const almacenamiento = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, carpetaUploads);
    },

    filename: (req, file, cb) => {
        const extension = extensionesPermitidas[file.mimetype];

        const nombreArchivo =
            Date.now() + "-" + Math.round(Math.random() * 1E9) + extension;

        cb(null, nombreArchivo);
    }

});

const upload = multer({

    storage: almacenamiento,

    fileFilter: (req, file, cb) => {

        if (extensionesPermitidas[file.mimetype]) {
            return cb(null, true);
        }

        // statusCode 400 para que manejadorErrores responda "Bad Request"
        // y no un 500 (es un error del cliente, no del servidor)
        const error = new Error("Solo se permiten imágenes JPG, PNG, WEBP o GIF");
        error.statusCode = 400;
        cb(error);
    },

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }

});

module.exports = upload.single("imagen");
