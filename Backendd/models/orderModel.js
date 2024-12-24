const mongoose = require('mongoose');

const orderSChema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date
})

const orderModel = mongoose.model('order',orderSChema)

module.exports = orderModel