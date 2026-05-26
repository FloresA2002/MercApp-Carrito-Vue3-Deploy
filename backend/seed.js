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
        imageUrl: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg',
        categoryId: electronica._id,
        stock: 5
      },
      {
        name: 'Mouse RGB',
        description: 'Mouse gamer con iluminación RGB y alta precisión.',
        price: 45,
        imageUrl: 'https://web-pro-resources.s3.us-east-2.amazonaws.com/public/optimized-resources/product/053f950a-41cf-4119-bbe4-106158810076/image/mouse-gaming-scorpion-rgb-6-botonesdpi-7200-negro_3-600x600.jpg',
        categoryId: electronica._id,
        stock: 20
      },
      {
        name: 'Teclado Mecánico',
        description: 'Teclado mecánico retroiluminado para gaming y productividad.',
        price: 85,
        imageUrl: 'https://www.tecnosmart.com.ec/wp-content/webpc-passthru.php?src=https://i0.wp.com/www.tecnosmart.com.ec/wp-content/uploads/2023/07/TEC0469.jpg&nocache=1?fit=1024%2C1024&ssl=1',
        categoryId: electronica._id,
        stock: 15
      },
      {
        name: 'Camiseta',
        description: 'Camiseta cómoda de algodón.',
        price: 25,
        imageUrl: 'https://pinto.com.ec/media/catalog/product/cache/381ae5b972da9f51703e03f01640dcf7/1/r/1r9d47.png',
        categoryId: ropa._id,
        stock: 50
      },
      {
        name: 'Pantalón Jeans',
        description: 'Jeans azul clásico para uso diario.',
        price: 40,
        imageUrl: 'https://pinto.com.ec/media/catalog/product/cache/381ae5b972da9f51703e03f01640dcf7/9/A/9AQ47075500002_1_5.jpg',
        categoryId: ropa._id,
        stock: 30
      },
      {
        name: 'Sofá Moderno',
        description: 'Sofá cómodo para sala de estar.',
        price: 300,
        imageUrl: 'https://bosque.vtexassets.com/arquivos/ids/188495/MACK7204.jpg?v=638983862808970000',
        categoryId: hogar._id,
        stock: 4
      },
      {
        name: 'Mesa de Madera',
        description: 'Mesa de madera resistente para comedor o estudio.',
        price: 150,
        imageUrl: 'https://reimse.mx/wp-content/uploads/2020/02/mesa-madera-exteriores-ata-160.jpg',
        categoryId: hogar._id,
        stock: 10
      },
      {
        name: 'Balón Profesional',
        description: 'Balón profesional para entrenamiento deportivo.',
        price: 35,
        imageUrl: 'https://kaosport.vtexassets.com/arquivos/ids/157787/MAK.FN-4AZ.jpg?v=638411178889170000',
        categoryId: deportes._id,
        stock: 15
      },
      {
        name: 'Raqueta de Tenis',
        description: 'Raqueta ligera para tenis recreativo y competitivo.',
        price: 80,
        imageUrl: 'https://imagedelivery.net/0tt38OLkrSmHRt7hdItWEA/5e027241-594a-45a2-b6f2-4c5635d16900/public',
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