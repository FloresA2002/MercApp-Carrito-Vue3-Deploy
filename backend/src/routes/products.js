const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Product = require('../models/Product')
const Category = require('../models/Category')

// =============================
// VALIDACIONES
// =============================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

const validateProduct = async (body, isPartial = false) => {
  const {
    name,
    description,
    price,
    imageUrl,
    categoryId,
    stock
  } = body

  if (!isPartial) {
    if (
      !name ||
      !description ||
      price === undefined ||
      !imageUrl ||
      !categoryId ||
      stock === undefined
    ) {
      return 'Todos los campos son obligatorios'
    }
  }

  if (name !== undefined && typeof name !== 'string') {
    return 'El nombre debe ser texto'
  }

  if (description !== undefined && typeof description !== 'string') {
    return 'La descripción debe ser texto'
  }

  if (
    price !== undefined &&
    (typeof price !== 'number' || price <= 0)
  ) {
    return 'Precio inválido'
  }

  if (
    stock !== undefined &&
    (typeof stock !== 'number' || stock < 0)
  ) {
    return 'Stock inválido'
  }

  if (imageUrl !== undefined) {
    const urlPattern = /^https?:\/\/.+/

    if (!urlPattern.test(imageUrl)) {
      return 'URL de imagen inválida'
    }
  }

  if (categoryId !== undefined) {
    if (!isValidObjectId(categoryId)) {
      return 'Categoría inválida'
    }

    const categoryExists = await Category.findById(categoryId)

    if (!categoryExists) {
      return 'La categoría no existe'
    }
  }

  return null
}

// =============================
// GET ALL PRODUCTS
// =============================

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.json(products)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al obtener productos'
    })
  }
})

// =============================
// GET PRODUCT BY ID
// =============================

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID inválido'
      })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.json(product)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al obtener producto'
    })
  }
})

// =============================
// CREATE PRODUCT
// =============================

router.post('/', async (req, res) => {
  try {
    const validationError = await validateProduct(req.body)

    if (validationError) {
      return res.status(400).json({
        error: validationError
      })
    }

    const product = await Product.create(req.body)

    res.status(201).json(product)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al crear producto'
    })
  }
})

// =============================
// UPDATE PRODUCT (PUT)
// =============================

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID inválido'
      })
    }

    const validationError = await validateProduct(req.body)

    if (validationError) {
      return res.status(400).json({
        error: validationError
      })
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.json(product)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al actualizar producto'
    })
  }
})

// =============================
// PARTIAL UPDATE (PATCH)
// =============================

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID inválido'
      })
    }

    const validationError = await validateProduct(req.body, true)

    if (validationError) {
      return res.status(400).json({
        error: validationError
      })
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.json(product)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al actualizar producto'
    })
  }
})

// =============================
// DELETE PRODUCT
// =============================

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID inválido'
      })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.json({
      message: 'Producto eliminado'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al eliminar producto'
    })
  }
})

module.exports = router