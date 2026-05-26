require('dotenv').config()

const mongoose = require('mongoose')
const dns = require('dns')

const Product = require('./src/models/Product')
const Category = require('./src/models/Category')

dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
])

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB conectado')

    await Product.deleteMany()
    await Category.deleteMany()

    const categories = await Category.insertMany([
      { name: 'Electrónica' },
      { name: 'Ropa' },
      { name: 'Hogar' },
      { name: 'Deportes' }
    ])

    const electronica = categories.find(c => c.name === 'Electrónica')
    const ropa = categories.find(c => c.name === 'Ropa')
    const hogar = categories.find(c => c.name === 'Hogar')
    const deportes = categories.find(c => c.name === 'Deportes')

    await Product.insertMany([
      {
        name: 'Laptop Gamer',
        description: 'Laptop de alto rendimiento para videojuegos y trabajo profesional.',
        price: 1200,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: electronica._id,
        stock: 5
      },
      {
        name: 'Mouse RGB',
        description: 'Mouse gamer con iluminación RGB y alta precisión.',
        price: 45,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: electronica._id,
        stock: 20
      },
      {
        name: 'Teclado Mecánico',
        description: 'Teclado mecánico retroiluminado para gaming y productividad.',
        price: 85,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: electronica._id,
        stock: 15
      },
      {
        name: 'Camiseta',
        description: 'Camiseta cómoda de algodón.',
        price: 25,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: ropa._id,
        stock: 50
      },
      {
        name: 'Pantalón Jeans',
        description: 'Jeans azul clásico para uso diario.',
        price: 40,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: ropa._id,
        stock: 30
      },
      {
        name: 'Sofá Moderno',
        description: 'Sofá cómodo para sala de estar.',
        price: 300,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: hogar._id,
        stock: 4
      },
      {
        name: 'Mesa de Madera',
        description: 'Mesa de madera resistente para comedor o estudio.',
        price: 150,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: hogar._id,
        stock: 10
      },
      {
        name: 'Balón Profesional',
        description: 'Balón profesional para entrenamiento deportivo.',
        price: 35,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: deportes._id,
        stock: 15
      },
      {
        name: 'Raqueta de Tenis',
        description: 'Raqueta ligera para tenis recreativo y competitivo.',
        price: 80,
        imageUrl: 'https://via.placeholder.com/400',
        categoryId: deportes._id,
        stock: 8
      }
    ])

    console.log('Seed ejecutado correctamente')

    process.exit(0)
  } catch (error) {
    console.error('Error ejecutando seed:', error.message)

    process.exit(1)
  }
}

seed()