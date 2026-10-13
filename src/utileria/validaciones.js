// =====================================================
// VALIDACIONES DE PRODUCTOS
// Los mensajes coinciden con los que documenta el readme.
// =====================================================

// Un valor se considera "vacío" si no llegó, es null o es un texto en blanco
const estaVacio = (valor) =>
    valor === undefined ||
    valor === null ||
    (typeof valor === "string" && valor.trim() === "");

// Convierte a número solo si llegó como número o como texto
// (con form-data todo llega como texto; con JSON puede ser número).
// Así evitamos que true, [] u {} se conviertan en 1, 0 o NaN "por accidente".
const aNumero = (valor) =>
    typeof valor === "number" || typeof valor === "string"
        ? Number(valor)
        : NaN;

// -----------------------------------------------------
// Valida el cuerpo de POST y PUT.
// Devuelve { error } si algo está mal, o { datos } ya limpios y convertidos.
// -----------------------------------------------------
const validarProducto = (cuerpo = {}) => {
    const { nombre, precio, stock, categoria } = cuerpo;

    if (
        estaVacio(nombre) ||
        estaVacio(precio) ||
        estaVacio(stock) ||
        estaVacio(categoria)
    ) {
        return { error: "Nombre, precio, stock y categoria son obligatorios" };
    }

    // Con JSON alguien podría enviar "nombre": 123 y .trim() fallaría
    if (typeof nombre !== "string" || typeof categoria !== "string") {
        return { error: "Nombre y categoria deben ser texto" };
    }

    const precioNumero = aNumero(precio);

    if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
        return { error: "El precio debe ser un número mayor a 0" };
    }

    const stockNumero = aNumero(stock);

    if (!Number.isInteger(stockNumero) || stockNumero < 0) {
        return { error: "El stock debe ser un entero positivo o 0" };
    }

    return {
        datos: {
            nombre: nombre.trim(),
            precio: precioNumero,
            stock: stockNumero,
            categoria: categoria.trim()
        }
    };
};

// -----------------------------------------------------
// Valida el :id de la URL. Devuelve el número, o null si no es válido.
// (parseInt("1abc") daría 1; aquí exigimos que sean solo dígitos)
// -----------------------------------------------------
const validarId = (valor) => {
    if (!/^\d+$/.test(String(valor))) {
        return null;
    }

    const id = Number(valor);

    return Number.isSafeInteger(id) ? id : null;
};

module.exports = {
    validarProducto,
    validarId
};
