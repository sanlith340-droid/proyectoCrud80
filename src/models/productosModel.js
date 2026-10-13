const fs = require("fs");
const { rutaProductos } = require("../config/db");

// =====================================================
// ASEGURAR QUE EL ARCHIVO DE PRODUCTOS EXISTA
// =====================================================

function asegurarArchivo() {
    if (!fs.existsSync(rutaProductos)) {
        fs.writeFileSync(rutaProductos, JSON.stringify([], null, 2));
    }
}

// =====================================================
// LEER / GUARDAR PRODUCTOS
// =====================================================

function leerProductos() {
    asegurarArchivo();
    const datos = fs.readFileSync(rutaProductos, "utf-8");
    return JSON.parse(datos);
}

function guardarProductos(productos) {
    fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));
}

// =====================================================
// LISTAR / BUSCAR
// =====================================================

function listarProductos() {
    return leerProductos();
}

function buscarPorId(id) {
    const productos = leerProductos();
    return productos.find(producto => producto.id === id);
}

// =====================================================
// CREAR PRODUCTO
// =====================================================

function crearProducto({ nombre, precio, stock, categoria, imagen }) {
    const productos = leerProductos();

    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(producto => producto.id)) + 1
        : 1;

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        precio,
        stock,
        categoria,
        imagen: imagen || null
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    return nuevoProducto;
}

// =====================================================
// ACTUALIZAR PRODUCTO
// Si "imagen" viene undefined se conserva la que ya tenía.
// Devuelve el producto actualizado, o undefined si el id no existe.
// =====================================================

function actualizarProducto(id, { nombre, precio, stock, categoria, imagen }) {
    const productos = leerProductos();

    const posicion = productos.findIndex(producto => producto.id === id);

    if (posicion === -1) {
        return undefined;
    }

    productos[posicion] = {
        id,
        nombre,
        precio,
        stock,
        categoria,
        imagen: imagen !== undefined ? imagen : (productos[posicion].imagen || null)
    };

    guardarProductos(productos);

    return productos[posicion];
}

// =====================================================
// ELIMINAR PRODUCTO
// Devuelve el producto eliminado, o undefined si el id no existe.
// =====================================================

function eliminarProducto(id) {
    const productos = leerProductos();

    const posicion = productos.findIndex(producto => producto.id === id);

    if (posicion === -1) {
        return undefined;
    }

    const [productoEliminado] = productos.splice(posicion, 1);

    guardarProductos(productos);

    return productoEliminado;
}

module.exports = {
    listarProductos,
    buscarPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
