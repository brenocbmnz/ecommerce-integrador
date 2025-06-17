const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    seedProducts
} = require('../controllers/productController');

// READ routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// CREATE route
router.post('/products', createProduct);

// UPDATE route
router.put('/products/:id', updateProduct);

// DELETE route
router.delete('/products/:id', deleteProduct);

// Special route for seeding the database
router.get('/seed', seedProducts);

module.exports = router;