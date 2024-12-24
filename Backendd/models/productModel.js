const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    ratings: Number,
    images: [
        { type: String }
    ],
    category: String,
    seller: String,
    stock: Number,
    numOfReviews: Number,
    createdAt: Date
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel;

