-----------------------------------

Resopistorio GitHub: https://github.com/FloresA2002/MercApp-Carrito-Vue3.git

------------------------------------





# MercApp

MercApp es una aplicación web SPA (Single Page Application) desarrollada con Vue 3 + Vite y un API REST propio construido con Node.js y Express.  
La aplicación permite visualizar productos, filtrarlos, buscarlos, administrar un carrito de compras y realizar operaciones CRUD completas sobre productos.

---

# Características Principales

## Frontend (Vue 3)

- SPA con Vue Router
- Composition API
- Componentes reutilizables
- Comunicación mediante Props y Eventos
- Lazy Loading de vistas
- Suspense y fallback de carga
- Búsqueda reactiva
- Filtro por categorías
- Carrito persistente con localStorage
- Diseño responsive moderno
- Manejo de estados y composables personalizados

---

## Backend (Node.js + Express)

- API REST completa
- CRUD de productos
- Endpoint de categorías
- Validación básica
- Manejo de errores HTTP
- Persistencia con archivo JSON
- Seed automático de datos

---

# Tecnologías Utilizadas

## Frontend

- Vue 3
- Vue Router
- Vite
- Composition API

## Backend

- Node.js
- Express
- Nodemon

---

# Estructura del Proyecto

```bash
mercapp/
│
├── backend/
│   ├── data/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── router/
│   │   ├── views/
│   │   └── App.vue
│   │
│   └── vite.config.js
│
└── README.md