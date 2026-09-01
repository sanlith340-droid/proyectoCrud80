require("dotenv").config();

const express = require("express");

const miApp = express();

const miPuerto = process.env.MIPUERTO || 3333;

// Middleware
miApp.use(express.json());

// Ruta principal
miApp.get("/", (req, res) => {
    res.send("<h1>API REST Productos la 80</h1>");
});

// Servidor
miApp.listen(miPuerto, () => {
    console.log(`SERVIDOR: http://localhost:${miPuerto}`);
});