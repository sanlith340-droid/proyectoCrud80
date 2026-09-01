import "dotenv/config";

import express from "express";

import fs from "fs";

const miApp = express();

const miPuerto = process.env.MIPUERTO || 3333;

const archivoProductos = "./datosProductos.json";


// =====================================================
// MIDDLEWARE
// =====================================================

miApp.use(express.json());


// =====================================================
// LEER PRODUCTOS
// =====================================================

function leerProductos() {

    const datos = fs.readFileSync(
        archivoProductos,
        "utf-8"
    );

    return JSON.parse(datos);
}


// =====================================================
// GUARDAR PRODUCTOS
// =====================================================

function guardarProductos(productos) {

    fs.writeFileSync(
        archivoProductos,
        JSON.stringify(productos, null, 2)
    );

}


// =====================================================
// RUTA PRINCIPAL
// =====================================================

miApp.get("/", (req, res) => {

    res.send("<h1>API REST Productos la 80 - ES Modules</h1>");

});


// =====================================================
// GET TODOS
// =====================================================

miApp.get("/api/productos", (req, res) => {

    try {

        const productos = leerProductos();

        res.status(200).json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });

    }

});


// =====================================================
// GET POR ID
// =====================================================

miApp.get("/api/productos/:id", (req, res) => {

    try {

        const productos = leerProductos();

        const id = parseInt(req.params.id);

        const producto = productos.find(
            producto => producto.id === id
        );

        if (!producto) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }

        res.status(200).json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar el producto"
        });

    }

});


// =====================================================
// POST
// =====================================================

miApp.post("/api/productos", (req, res) => {

    try {

        const {
            nombre,
            precio,
            stock,
            categoria
        } = req.body;


        if (
            nombre === undefined ||
            nombre === "" ||
            precio === undefined ||
            precio === "" ||
            stock === undefined ||
            stock === "" ||
            categoria === undefined ||
            categoria === ""
        ) {

            return res.status(400).json({
                mensaje: "Nombre, precio, stock y categoria son obligatorios"
            });

        }


        if (
            typeof precio !== "number" ||
            precio <= 0
        ) {

            return res.status(400).json({
                mensaje: "El precio debe ser un número mayor a 0"
            });

        }


        if (
            typeof stock !== "number" ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {

            return res.status(400).json({
                mensaje: "El stock debe ser un entero positivo o 0"
            });

        }


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

            imagen: null

        };


        productos.push(nuevoProducto);

        guardarProductos(productos);


        res.status(201).json({

            mensaje: "Producto creado correctamente",

            producto: nuevoProducto

        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear el producto"
        });

    }

});


// =====================================================
// PUT
// =====================================================

miApp.put("/api/productos/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const {
            nombre,
            precio,
            stock,
            categoria
        } = req.body;


        if (
            nombre === undefined ||
            nombre === "" ||
            precio === undefined ||
            precio === "" ||
            stock === undefined ||
            stock === "" ||
            categoria === undefined ||
            categoria === ""
        ) {

            return res.status(400).json({
                mensaje: "Nombre, precio, stock y categoria son obligatorios"
            });

        }


        if (
            typeof precio !== "number" ||
            precio <= 0
        ) {

            return res.status(400).json({
                mensaje: "El precio debe ser un número mayor a 0"
            });

        }


        if (
            typeof stock !== "number" ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {

            return res.status(400).json({
                mensaje: "El stock debe ser un entero positivo o 0"
            });

        }


        const productos = leerProductos();


        const posicion = productos.findIndex(
            producto => producto.id === id
        );


        if (posicion === -1) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }


        productos[posicion] = {

            id,

            nombre,

            precio,

            stock,

            categoria,

            imagen: productos[posicion].imagen || null

        };


        guardarProductos(productos);


        res.status(200).json({

            mensaje: "Producto actualizado correctamente",

            producto: productos[posicion]

        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar el producto"
        });

    }

});


// =====================================================
// DELETE
// =====================================================

miApp.delete("/api/productos/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const productos = leerProductos();


        const posicion = productos.findIndex(
            producto => producto.id === id
        );


        if (posicion === -1) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }


        const productoEliminado =
            productos.splice(posicion, 1)[0];


        guardarProductos(productos);


        res.status(200).json({

            mensaje: "Producto eliminado correctamente",

            producto: productoEliminado

        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });

    }

});


// =====================================================
// SERVIDOR
// =====================================================

miApp.listen(miPuerto, () => {

    console.log(
        `SERVIDOR: http://localhost:${miPuerto}`
    );

});