const mongoose = require('mongoose')
const dns = require('dns')

// Forzar DNS públicos para que Node pueda resolver mongodb+srv
dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
])

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB