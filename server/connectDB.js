const mongoose = require('mongoose')
const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('App connected to the DB')   
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB