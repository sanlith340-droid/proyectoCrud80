//consolida todos los enrutadores
const { Router } = require("express");
const usuariosRouter = require("./usuariosRoutes");
const productosRouter = require("./productosRoutes");
const autenticacionToken = require("../middleware/autenticacion");
const enrutador = Router();

//enrutador
enrutador.use("/usuarios", usuariosRouter);

// Todo lo que sea /api/productos requiere estar autenticado (Authorization: Bearer <token>)
enrutador.use("/productos", autenticacionToken, productosRouter);

module.exports = enrutador;
