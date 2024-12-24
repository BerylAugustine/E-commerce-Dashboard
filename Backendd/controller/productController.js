const ProductModel = require('../models/productModel')
const multer = require('multer');
const path = require('path');

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const query = req.query.keyword ? {
    name: {
      $regex: req.query.keyword, //reqular expression
      $options: 'i' //case insensitive
    }
  } : {}
  const products = await ProductModel.find(query);
  res.json({
    success: true,
    message: 'get products working!',
    products
  })
}

//Get single product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json({
      success: true,
      message: 'get Single product working!',
      product
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      Message: 'Unable to get Product with that ID',
      ErrorMessage: error.message
    })
  }
}

// Set up multer storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify where to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Set filename format
  }
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Max file size 5MB
});

// Controller to create a product with image uploads
exports.createProduct = async (req, res) => {
  const { name, category, price, description, ratings, seller, stock } = req.body;

  // Process images uploaded via multer
  const images = req.files ? req.files.map(file => file.path) : [];

  console.log('Uploaded images:', images); // Debugging the file paths

  const product = new ProductModel({
    name,
    category,
    price,
    description,
    ratings,
    images,
    seller,
    stock,
    numOfReviews: 0, // Initialize the reviews count to 0
    createdAt: Date.now(), // Store the creation date
  });

  try {
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product,
    });
  } catch (error) {
    console.error('Error creating product:', error); // More detailed logging
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
    });
  }
};


exports.upload = upload;