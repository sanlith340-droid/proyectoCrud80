const express = require("express");
const router = express.Router();
const {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} = require("../controllers/productosController");
const subirImagen = require("../middleware/subirImagen");

// Estas rutas son PRIVADAS: el middleware de autenticación se aplica
// en routes/index.js, al montar este enrutador en "/productos".

router.get("/", listar);
router.get("/:id", obtenerPorId);
router.post("/", subirImagen, crear);
router.put("/:id", subirImagen, actualizar);
router.delete("/:id", eliminar);

module.exports = router;
