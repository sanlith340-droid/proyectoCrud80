const { Router } = require("express")

const listarProductos = async (req,res)=>{
    try {
        // obtener listado de pructos, utilizando el servicio
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
}


const listarUnProducto = (req,res)=>{
    res.json ({mensaje:"Ruta de listado de un producto"})
}

const crearProducto = (req,res)=>{
    res.json ({mensaje:"crear productos"})
}

const eliminarProducto = (req,res)=>{
    res.json ({mensaje:"eliminar productos"})
}




module.exports = {listarProductos,
listarUnProducto,
crearProducto,
eliminarProducto}