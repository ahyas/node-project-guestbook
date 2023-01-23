const mongoose = require("mongoose")

const collection = mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true, unique:true},
    no_hp:String,
    alamat:String,
})

module.exports = mongoose.model("Usersinfos", collection)