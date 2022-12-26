const mongoose = require('mongoose')

const collection = mongoose.Schema({
    inv_number:String,
    grand_qty:Number,
    grand_total:Number,
    amount:Number,
    change:Number,
})

module.exports = mongoose.model('sales', collection)