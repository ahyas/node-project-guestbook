const mongoose = require("mongoose")

const collecttion = mongoose.Schema({
    name:String,
    email:String
})

module.exports = mongoose.model("userinfos",collecttion)