📋 Endpoints que debes mostrar en la entrega

| Método | Endpoint             | Función             |
| ------ | -------------------- | ------------------- |
| GET    | `/`                  | Comprobar servidor  |
| GET    | `/api/productos`     | Listar productos    |
| GET    | `/api/productos/:id` | Buscar producto     |
| POST   | `/api/productos`     | Crear producto      |
| PUT    | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto   |


38. 🧪 Datos para probar en LiteClient
GET
GET http://localhost:3030/api/productos
GET por ID
GET http://localhost:3030/api/productos/1
POST
POST http://localhost:3030/api/productos
{
    "nombre": "Monitor Samsung",
    "precio": 850000,
    "stock": 8,
    "categoria": "Tecnologia"
}
PUT
PUT http://localhost:3030/api/productos/1
{
    "nombre": "Laptop Lenovo Ideapad",
    "precio": 3000000,
    "stock": 15,
    "categoria": "Computadores"
}
DELETE
DELETE http://localhost:3030/api/productos/2