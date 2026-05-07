const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const db = require('../data/db');

const productsPath = path.join(
  __dirname,
  '../data/products.json'
);

// Guardar productos en JSON
const saveProducts = () => {
  fs.writeFileSync(
    productsPath,
    JSON.stringify(db.products, null, 2)
  );
};

// =============================
// GET ALL PRODUCTS
// =============================
router.get('/', (req, res) => {
  res.json(db.products);
});

// =============================
// GET PRODUCT BY ID
// =============================
router.get('/:id', (req, res) => {
  const product = db.products.find(
    p => p.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    });
  }

  res.json(product);
});

// =============================
// CREATE PRODUCT
// =============================
router.post('/', (req, res) => {

  const {
    name,
    description,
    price,
    imageUrl,
    categoryId,
    stock
  } = req.body;

  // Validar campos obligatorios
  if (
    !name ||
    !description ||
    price === undefined ||
    !imageUrl ||
    categoryId === undefined ||
    stock === undefined
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  // Validar tipos
  if (typeof name !== 'string') {
    return res.status(400).json({
      error: 'El nombre debe ser texto'
    });
  }

  if (typeof description !== 'string') {
    return res.status(400).json({
      error: 'La descripción debe ser texto'
    });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      error: 'Precio inválido'
    });
  }

  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({
      error: 'Stock inválido'
    });
  }

  // Validar URL
  const urlPattern = /^https?:\/\/.+/;

  if (!urlPattern.test(imageUrl)) {
    return res.status(400).json({
      error: 'URL de imagen inválida'
    });
  }

  // Crear producto
  const newProduct = {
    id: Date.now(),
    name,
    description,
    price,
    imageUrl,
    categoryId,
    stock
  };

  db.products.push(newProduct);

  // Guardar cambios
  saveProducts();

  res.status(201).json(newProduct);
});

// =============================
// UPDATE PRODUCT (PUT)
// =============================
router.put('/:id', (req, res) => {

  const index = db.products.findIndex(
    p => p.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    });
  }

  // Validaciones opcionales
  if (
    req.body.price !== undefined &&
    (typeof req.body.price !== 'number' ||
      req.body.price <= 0)
  ) {
    return res.status(400).json({
      error: 'Precio inválido'
    });
  }

  if (
    req.body.stock !== undefined &&
    (typeof req.body.stock !== 'number' ||
      req.body.stock < 0)
  ) {
    return res.status(400).json({
      error: 'Stock inválido'
    });
  }

  // Actualizar producto
  db.products[index] = {
    ...db.products[index],
    ...req.body
  };

  // Guardar cambios
  saveProducts();

  res.json(db.products[index]);
});

// =============================
// PARTIAL UPDATE (PATCH)
// =============================
router.patch('/:id', (req, res) => {

  const product = db.products.find(
    p => p.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    });
  }

  // Validaciones
  if (
    req.body.price !== undefined &&
    (typeof req.body.price !== 'number' ||
      req.body.price <= 0)
  ) {
    return res.status(400).json({
      error: 'Precio inválido'
    });
  }

  if (
    req.body.stock !== undefined &&
    (typeof req.body.stock !== 'number' ||
      req.body.stock < 0)
  ) {
    return res.status(400).json({
      error: 'Stock inválido'
    });
  }

  // Actualizar parcialmente
  Object.assign(product, req.body);

  // Guardar cambios
  saveProducts();

  res.json(product);
});

// =============================
// DELETE PRODUCT
// =============================
router.delete('/:id', (req, res) => {

  const index = db.products.findIndex(
    p => p.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    });
  }

  db.products.splice(index, 1);

  // Guardar cambios
  saveProducts();

  res.json({
    message: 'Producto eliminado'
  });
});

module.exports = router;