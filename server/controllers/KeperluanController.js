const KeperluanModel = require("../models/KeperluanModel")

const getAllKeperluan = async (req, res) =>{
    try {
        const list = await KeperluanModel.find({})
        res.json(list)   
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getAllKeperluan}