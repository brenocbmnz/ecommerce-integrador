const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, seedProducts } = require('../controllers/productController');

// Attach controller functions to routes.
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/seed', seedProducts);

module.exports = router;