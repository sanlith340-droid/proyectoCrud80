const express = require("express");

const miApp = express();

const miPuerto = 3333;

// Middleware para recibir JSON
miApp.use(express.json());

// Endpoint raíz
miApp.get("/", (req, res) => {
    res.send("<h1>API REST Productos la 80</h1>");
});

// Servidor
miApp.listen(miPuerto, () => {
    console.log(`SERVIDOR: http://localhost:${miPuerto}`);
});
