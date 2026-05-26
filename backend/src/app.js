require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')

const app = express()

connectDB()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.NETLIFY_URL
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Origen no permitido por CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
)

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MercApp API'
  })
})

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  })
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).json({
    error: 'Error interno del servidor'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})