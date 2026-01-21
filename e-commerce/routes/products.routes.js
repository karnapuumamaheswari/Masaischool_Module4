const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products - Get All Products
router.get('/', productController.getAllProducts);

// GET /products/:productId - Get Product by ID
router.get('/:productId', productController.getProductById);

module.exports = router;
