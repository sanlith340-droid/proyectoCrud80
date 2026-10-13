const productosModel = require("../models/productosModel");

// Listar todos los productos
const listarProductos = async (req, res) => {
try {
const productos = await productosModel.listar();


    return res.status(200).json(productos);
} catch (error) {
    return res.status(500).json({
        mensaje: error.message
    });
}


};

// Listar un producto
const listarUnProducto = (req, res) => {
res.json({
mensaje: "Ruta de listado de un producto"
});
};

// Crear un producto
const crearProducto = (req, res) => {
res.json({
mensaje: "Crear productos"
});
};

// Eliminar un producto
const eliminarProducto = (req, res) => {
res.json({
mensaje: "Eliminar productos"
});
};

module.exports = {
listarProductos,
listarUnProducto,
crearProducto,
eliminarProducto
};
