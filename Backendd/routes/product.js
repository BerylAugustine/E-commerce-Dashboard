const express = require('express');
const { getProducts, getSingleProduct, createProduct, upload } = require('../controller/productController');
const router = express.Router();

console.log('upload middleware:', upload); // Add this line to check if upload is imported correctly

// Get all products
router.route('/products').get(getProducts);

// Get a single product by ID
router.route('/product/:id').get(getSingleProduct);

// Route for creating a product
router.post('/products', upload.array('images', 5), createProduct); //



module.exports = router;
