const express = require("express");
require("dotenv").config();

//importar de la carpeta routes. usaremos un archivo que contendra los enrutadores
const enrutador = require("./routes");
const manejadorErrores = require("./middleware/manejadorErrores");
const { carpetaUploads } = require("./config/db");
const app = express();

//app usar middleware body-parse
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//imagenes de los productos (carpeta publica): http://localhost:PUERTO/uploads/archivo.jpg
app.use("/uploads", express.static(carpetaUploads));

//app usara una ruta predeterminada "/api", con un enrutador
app.use("/api", enrutador);

//endpoint raiz
app.get("/", (req, res) => {
  res.send("Enpoint raiz de nuestra API Rest 3407180");
});

//manejo de errores: SIEMPRE al final, despues de todas las rutas
app.use(manejadorErrores);

module.exports = app;
