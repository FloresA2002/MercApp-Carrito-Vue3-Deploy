const express = require('express')

const router = express.Router()

const Category = require('../models/Category')

// =============================
// GET ALL CATEGORIES
// =============================

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })

    res.json(categories)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Error al obtener categorías'
    })
  }
})

module.exports = router