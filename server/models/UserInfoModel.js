const mongoose = require("mongoose")

const collecttion = mongoose.Schema({
    name:String,
    email:String
})

module.exports = mongoose.model("usersinfos",collecttion)