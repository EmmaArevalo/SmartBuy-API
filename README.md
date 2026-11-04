# Smart Buy — API REST

Backend para gestionar productos de Smart Buy, integrado con un frontend en Angular.

**Aprendiz:** Emma Alexandra Arévalo Rodríguez  
**Ficha:** 3186670 — SENA  
**Evidencia:** GA8-220501096-AA1-EV01

## Tecnologías

Node.js, Express, MongoDB y Mongoose.

## Requisitos

- Node.js y npm instalados.
- MongoDB ejecutándose localmente en el puerto 27017.
- Puerto 3000 disponible para la API.

La aplicación utiliza la base de datos `smartbuy` mediante esta conexión:

```text
mongodb://127.0.0.1:27017/smartbuy
```

MongoDB Compass es opcional: el servicio de MongoDB debe estar activo.

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/EmmaArevalo/SmartBuy-API.git
cd SmartBuy-API
npm ci
npm run dev
```

Mantener abierta la terminal mientras se utiliza la aplicación.

La consola debe mostrar:

```text
Servidor SmartBuy ejecutándose en puerto 3000
Conectado a MongoDB
```

Consultar los productos en:

http://127.0.0.1:3000/api/productos

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | /api/productos | Listar productos |
| GET | /api/productos/:id | Consultar un producto |
| POST | /api/productos | Crear un producto |
| PUT | /api/productos/:id | Actualizar un producto |
| DELETE | /api/productos/:id | Eliminar un producto |

Para crear y actualizar se envía JSON con estos campos:

```json
{
  "nombre": "Mouse",
  "categoria": "Accesorios",
  "marca": "Logitech",
  "precio": 25000,
  "stock": 3
}
```

El identificador `_id` lo genera MongoDB.

## Organización

- `app.js`: configuración del servidor y conexión con MongoDB.
- `models/Producto.js`: modelo del producto.
- `routes/productos.js`: rutas y operaciones CRUD.

## Frontend relacionado

https://github.com/EmmaArevalo/SmartBuy-Frontend.

Ejecutar el frontend en otra terminal:

```bash
npm ci
npm start
```

Estos comandos se ejecutan dentro de la carpeta del frontend.
Abrir http://localhost:4200 y mantener también la API funcionando.

Una base de datos nueva puede mostrar un inventario vacío.
Los productos se pueden crear desde el formulario del frontend.

## Verificación

Se realizaron pruebas manuales de creación, consulta, modificación
y eliminación desde Angular.

Las siete pruebas unitarias del componente Angular utilizan un
servicio simulado y no modifican MongoDB. Se ejecutan desde el
frontend con:

```bash
npm test -- --watch=false
```

Para compilar el frontend:

```bash
npm run build
```

## Alcance

Esta versión permite gestionar productos en un entorno local.
No incluye autenticación ni autorización de usuarios.