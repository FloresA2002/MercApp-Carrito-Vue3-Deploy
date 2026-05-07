# MercApp

Aplicación web SPA desarrollada con Vue 3 y Vite que consume un API REST propio.

## Tecnologías utilizadas

### Frontend
- Vue 3
- Vue Router
- Vite
- Composition API

### Backend
- Node.js
- Express

## Funcionalidades

- Catálogo de productos
- Búsqueda de productos
- Filtro por categorías
- Detalle de producto
- Carrito de compras
- Persistencia con localStorage
- Lazy loading de vistas
- Formularios de creación y edición
- API REST completa

## Rutas principales

- `/` → Catálogo
- `/product/:id` → Detalle
- `/product/new` → Nuevo producto
- `/product/:id/edit` → Editar producto
- `/cart` → Carrito
- `/about` → Acerca de

## Instalación

### Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

El backend corre en:

```text
http://localhost:3000
```

El frontend corre en:

```text
http://localhost:5173
```

## Autor

Anthony Flores