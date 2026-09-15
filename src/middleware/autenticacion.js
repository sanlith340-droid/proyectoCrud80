// importar libreria
const jwtoken = require("jsonwebtoken");

// =====================================================
// MIDDLEWARE DE AUTENTICACIÓN
// Formato esperado del encabezado: Authorization: Bearer <token>
// =====================================================

const autenticacionToken = (req, res, next) => {

    const encabezado = req.header("Authorization");

    if (!encabezado) {
        return res.status(401).json({
            mensaje: "Acceso denegado, no se proveyó un token."
            // 401: no enviaste credenciales
            // 403: enviaste credenciales pero no son válidas
        });
    }

    // Soporta tanto "Bearer <token>" como el token solo
    const partes = encabezado.split(" ");
    const token = partes.length === 2 ? partes[1] : partes[0];

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado, no se proveyó un token."
        });
    }

    jwtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {

        if (error) {
            return res.status(403).json({ mensaje: "Token inválido" });
        }

        req.aprendiz = usuario;
        next(); // ahora next() solo se llama cuando el token es válido

    });

};

module.exports = autenticacionToken;
