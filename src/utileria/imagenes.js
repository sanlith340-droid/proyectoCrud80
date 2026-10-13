const fs = require("fs");
const path = require("path");
const { carpetaUploads } = require("../config/db");

// =====================================================
// BORRAR UNA IMAGEN DE LA CARPETA uploads
// Acepta tanto la ruta pública guardada en el producto ("/uploads/abc.jpg")
// como solo el nombre del archivo ("abc.jpg").
// path.basename evita que una ruta manipulada salga de la carpeta uploads.
// Nunca lanza error: si el archivo no existe o no se puede borrar, se ignora.
// =====================================================

const borrarImagen = (ruta) => {
    if (!ruta) {
        return;
    }

    const archivo = path.join(carpetaUploads, path.basename(ruta));

    try {
        if (fs.existsSync(archivo)) {
            fs.unlinkSync(archivo);
        }
    } catch (error) {
        console.error(`No se pudo borrar la imagen ${archivo}: ${error.message}`);
    }
};

module.exports = { borrarImagen };
