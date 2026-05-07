const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const db = require('../data/db');

const productsPath = path.join(
  __dirname,
  '../data/products.json'
);

const saveProducts = () => {
  fs.writeFileSync(
    productsPath,
    JSON.stringify(db.products, null, 2)
  );
};

router.get('/', (req, res) => {
  res.json(db.categories);
});

module.exports = router;