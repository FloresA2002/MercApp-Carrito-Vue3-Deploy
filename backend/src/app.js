const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error global
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno' });
});

app.listen(3000, () => {
  console.log('API en http://localhost:3000');
});