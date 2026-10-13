const productosModel = require("../models/productosModel");
const { validarProducto, validarId } = require("../utileria/validaciones");
const { borrarImagen } = require("../utileria/imagenes");

// =====================================================
// AYUDANTE: responder con error borrando antes la imagen recién subida.
// Multer guarda el archivo en disco ANTES de que el controlador valide;
// si luego rechazamos la solicitud, ese archivo quedaría huérfano.
// =====================================================

const responderError = (req, res, estado, mensaje) => {
    if (req.file) {
        borrarImagen(req.file.filename);
    }

    return res.status(estado).json({ mensaje });
};

// =====================================================
// GET /api/productos
// =====================================================

const listar = (req, res) => {
    try {
        const productos = productosModel.listarProductos();

        res.status(200).json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
};

// =====================================================
// GET /api/productos/:id
// =====================================================

const obtenerPorId = (req, res) => {
    try {
        const id = validarId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                mensaje: "El id debe ser un número entero positivo"
            });
        }

        const producto = productosModel.buscarPorId(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al buscar el producto" });
    }
};

// =====================================================
// POST /api/productos
// Acepta JSON o multipart/form-data (con la imagen en el campo "imagen")
// =====================================================

const crear = (req, res) => {
    try {
        // En Express 5 req.body es undefined si la solicitud no trae cuerpo
        const { error, datos } = validarProducto(req.body || {});

        if (error) {
            return responderError(req, res, 400, error);
        }

        const imagen = req.file ? `/uploads/${req.file.filename}` : null;

        const producto = productosModel.crearProducto({ ...datos, imagen });

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto
        });

    } catch (error) {
        console.error(error);
        responderError(req, res, 500, "Error al crear el producto");
    }
};

// =====================================================
// PUT /api/productos/:id
// Mismas validaciones que POST. Si no se envía imagen, se conserva la anterior.
// =====================================================

const actualizar = (req, res) => {
    try {
        const id = validarId(req.params.id);

        if (id === null) {
            return responderError(req, res, 400, "El id debe ser un número entero positivo");
        }

        const existente = productosModel.buscarPorId(id);

        if (!existente) {
            return responderError(req, res, 404, "Producto no encontrado");
        }

        const { error, datos } = validarProducto(req.body || {});

        if (error) {
            return responderError(req, res, 400, error);
        }

        // undefined = conservar la imagen que ya tenía
        const imagen = req.file ? `/uploads/${req.file.filename}` : undefined;

        const producto = productosModel.actualizarProducto(id, { ...datos, imagen });

        // Ya se guardó la nueva imagen: la anterior ya no sirve, la borramos
        if (req.file) {
            borrarImagen(existente.imagen);
        }

        res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            producto
        });

    } catch (error) {
        console.error(error);
        responderError(req, res, 500, "Error al actualizar el producto");
    }
};

// =====================================================
// DELETE /api/productos/:id
// =====================================================

const eliminar = (req, res) => {
    try {
        const id = validarId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                mensaje: "El id debe ser un número entero positivo"
            });
        }

        const producto = productosModel.eliminarProducto(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Eliminar la imagen del servidor, si tenía una
        borrarImagen(producto.imagen);

        res.status(200).json({
            mensaje: "Producto eliminado correctamente",
            producto
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
};

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
