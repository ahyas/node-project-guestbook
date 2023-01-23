const mongoose = require("mongoose")

const collection = mongoose.Schema({
    description:String
})

module.exports = mongoose.model("Keperluan", collection)