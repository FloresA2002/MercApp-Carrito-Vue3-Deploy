# MercApp

MercApp es una aplicación web SPA desarrollada con Vue 3 + Vite que consume una API REST propia construida con Node.js, Express y MongoDB Atlas.

El proyecto permite gestionar un catálogo de productos, consultar detalles, filtrar por categorías, buscar productos, crear/editar productos y manejar un carrito de compras persistente.

---

## URLs del proyecto

### Frontend desplegado en Netlify

https://mercapp-carrito.netlify.app/

### Backend desplegado en Railway

https://dynamic-amazement-production-b864.up.railway.app

### Health Check de la API

https://dynamic-amazement-production-b864.up.railway.app/health

### Micrositio en GitHub Pages

https://floresa2002.github.io/MercApp-Carrito-Vue3-Deploy/

---

## Tecnologías utilizadas

### Frontend

- Vue 3
- Vite
- Vue Router
- Composition API
- Single File Components
- LocalStorage
- CSS moderno responsive

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- Dotenv

### Despliegue

- MongoDB Atlas
- Railway
- Netlify
- GitHub Pages

---

## Funcionalidades principales

- Catálogo de productos.
- Búsqueda por nombre y descripción.
- Filtro por categoría.
- Vista de detalle de producto.
- Formulario para crear productos.
- Formulario para editar productos.
- Carrito de compras.
- Incremento y disminución de cantidades en el carrito.
- Eliminación de productos del carrito.
- Cálculo automático del total.
- Persistencia del carrito en LocalStorage.
- Simulación de compra exitosa.
- Lazy loading de vistas.
- Suspense con fallback de carga.
- Diseño responsive moderno.
- API REST con MongoDB Atlas.

---

## Estructura del proyecto

```txt
mercapp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── config/
│   │   ├── router/
│   │   └── views/
│   ├── package.json
│   └── .env.example
│
├── docs/
│   └── index.html
│
├── README.md
└── .gitignore
```

---

## Instalación local

Para ejecutar el proyecto localmente se deben iniciar por separado el backend y el frontend.

---

## Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como base `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/mercapp?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
LOCAL_PREVIEW_URL=http://localhost:4173
NETLIFY_URL=https://mercapp-carrito.netlify.app
```

Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

```txt
http://localhost:3000
```

Health check local:

```txt
http://localhost:3000/health
```

---

## Seed de datos

Para poblar la base de datos con productos y categorías iniciales:

```bash
cd backend
npm run seed
```

Este comando inserta categorías y productos de prueba en MongoDB Atlas.

---

## Frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como base `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

Ejecutar el frontend en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:5173
```

---

## Build del frontend

Para generar una versión optimizada de producción:

```bash
cd frontend
npm run build
```

Para probar el build localmente:

```bash
npm run preview
```

---

## Variables de entorno

### Backend

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde se ejecuta el servidor localmente. |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas. |
| `FRONTEND_URL` | URL del frontend local en desarrollo. |
| `LOCAL_PREVIEW_URL` | URL local usada por `npm run preview`. |
| `NETLIFY_URL` | URL pública del frontend desplegado en Netlify. |

### Frontend

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API REST. |

---

## API REST

URL base en producción:

```txt
https://dynamic-amazement-production-b864.up.railway.app
```

### Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Verifica el estado de la API. |
| GET | `/api/products` | Obtiene todos los productos. |
| GET | `/api/products/:id` | Obtiene un producto por ID. |
| POST | `/api/products` | Crea un nuevo producto. |
| PUT | `/api/products/:id` | Actualiza un producto completo. |
| PATCH | `/api/products/:id` | Actualiza parcialmente un producto. |
| DELETE | `/api/products/:id` | Elimina un producto. |
| GET | `/api/categories` | Obtiene todas las categorías. |

---

## Ejemplo de producto

```json
{
  "name": "Laptop Gamer",
  "description": "Laptop de alto rendimiento para videojuegos y trabajo profesional.",
  "price": 1200,
  "imageUrl": "https://ejemplo.com/laptop.jpg",
  "categoryId": "ID_DE_CATEGORIA",
  "stock": 5
}
```

---

## Despliegue

### Base de datos

La base de datos fue aprovisionada en MongoDB Atlas usando un clúster gratuito M0.

### Backend

El backend fue desplegado en Railway desde GitHub.

URL:

```txt
https://dynamic-amazement-production-b864.up.railway.app
```

### Frontend

El frontend fue desplegado en Netlify.

URL:

```txt
https://mercapp-carrito.netlify.app/
```

### Micrositio

El micrositio técnico fue publicado en GitHub Pages desde la carpeta `/docs`.

URL:

```txt
https://floresa2002.github.io/MercApp-Carrito-Vue3-Deploy/
```

---

## CORS

El backend fue configurado para aceptar solicitudes desde los siguientes orígenes:

```txt
http://localhost:5173
http://localhost:4173
https://mercapp-carrito.netlify.app
```

Esto permite trabajar en desarrollo local, validar el build con preview y consumir la API desde el frontend publicado en Netlify.

---

## Rutas del frontend

| Ruta | Descripción |
|---|---|
| `/` | Catálogo principal de productos. |
| `/product/:id` | Detalle de producto. |
| `/product/new` | Crear nuevo producto. |
| `/product/:id/edit` | Editar producto. |
| `/cart` | Carrito de compras. |
| `/about` | Información del proyecto. |

---

Proyecto académico desarrollado para la asignatura de Aplicaciones Web.

---

## Estado del proyecto

Proyecto desplegado correctamente con:

- Frontend público en Netlify.
- Backend público en Railway.
- Base de datos en MongoDB Atlas.
- Micrositio técnico en GitHub Pages.
- CORS configurado.
- Variables de entorno separadas.
- Build de producción validado.
