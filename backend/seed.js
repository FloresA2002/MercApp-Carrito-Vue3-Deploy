const db = require('./src/data/db');

db.products.length = 0;
db.categories.length = 0;
db.categories.push(
  { id: 1, name: "Electrónica" },
  { id: 2, name: "Ropa" },
  { id: 3, name: "Hogar" }
);

db.products.push(
  {
    id: 1,
    name: "Laptop",
    description: "Alta gama",
    price: 900,
    imageUrl: "https://via.placeholder.com/200",
    categoryId: 1,
    stock: 5
  },
  {
    id: 2,
    name: "Camiseta",
    description: "Algodón",
    price: 20,
    imageUrl: "https://via.placeholder.com/200",
    categoryId: 2,
    stock: 30
  }
);

console.log("Seed cargado");