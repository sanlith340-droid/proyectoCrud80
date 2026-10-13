const path = require("path");

// =====================================================
// CONFIGURACIÓN DE "BASE DE DATOS"
// Este proyecto no usa un motor de base de datos real,
// así que aquí centralizamos las rutas de los archivos
// JSON que hacen de almacenamiento.
// =====================================================

const rutaProductos = path.join(__dirname, "..", "..", "datosProductos.json");
const rutaUsuarios = path.join(__dirname, "..", "..", "datosUsuarios.json");

// Carpeta donde Multer guarda las imágenes de los productos.
// Se calcula desde este archivo (no desde donde se ejecute "node"),
// así funciona igual sin importar el directorio de trabajo.
const carpetaUploads = path.join(__dirname, "..", "..", "uploads");

module.exports = {
    rutaProductos,
    rutaUsuarios,
    carpetaUploads
};
