# Mascotas CRUD (Node.js + Express + MySQL + EJS)

Proyecto de ejemplo con:
- API REST: GET, POST, PUT, DELETE -> /api/mascotas
- Frontend simple con EJS y Bootstrap
- Base de datos MySQL con tabla `mascotas` (id, nombre VARCHAR, edad SMALLINT)

## Setup rápido
1. Clonar proyecto
2. Crear base de datos y tabla:
   ```sql
   CREATE DATABASE mascotas_db;
   USE mascotas_db;
   CREATE TABLE mascotas (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(100) NOT NULL,
     edad SMALLINT NOT NULL
   );
   ```
3. Instalar dependencias: `npm install`
4. Iniciar servidor: `npm run dev` (recomendado) o `npm start`
5. Abrir `http://localhost:3000`

## Endpoints principales (API JSON)
- `GET /api/mascotas` — listar todas
- `GET /api/mascotas/:id` — obtener una
- `POST /api/mascotas` — crear (body JSON: { nombre, edad })
- `PUT /api/mascotas/:id` — actualizar
- `DELETE /api/mascotas/:id` — eliminar

## Notas
- Use Postman para probar las rutas API.
- Este proyecto es una plantilla; para producción agregue validación, autenticación y manejo de errores más robusto.
