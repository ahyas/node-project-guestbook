const mongoose = require('mongoose')

const document = mongoose.Schema({
    inv_number:String,
    id_product:String,
    sub_qty:Number,
    price:Number,
    sub_total:Number
})

module.exports = mongoose.model('salesdetails', document)