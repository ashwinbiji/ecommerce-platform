const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;

  const product = new Product({
    user: req.user._id, // The admin creating the product
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = { getProducts, getProductById, createProduct };