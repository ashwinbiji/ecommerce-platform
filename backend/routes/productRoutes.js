const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all products, POST a new product (admin only)
router.route('/').get(getProducts).post(protect, admin, createProduct);

// GET a single product by its ID
router.route('/:id').get(getProductById);

module.exports = router;