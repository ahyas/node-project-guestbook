const mongoose = require('mongoose')

const collection = mongoose.Schema({
    sku:String,
    name:String,
    price:Number,
    category:String,
    brand:String,
    stock:Number
})

module.exports = mongoose.model('Products', collection)