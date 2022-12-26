const mongoose = require("mongoose")

const collection = mongoose.Schema({
    username:{type:String},
    password:{type:String, required:true},
})

module.exports = mongoose.model('Users', collection)