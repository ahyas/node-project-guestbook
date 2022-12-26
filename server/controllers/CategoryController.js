const CategoryModel = require("../models/CategoryModel")

const getAllCategory = async (req, res) => {
    try {
        const list = await CategoryModel.find({})
        res.json(list)    
    } catch (error) {
        res.json(error)
    }
}

const viewCategory = async (req, res) => {
    try {
        const {id} = req.params
        const list = await CategoryModel.findById(id)
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getAllCategory, viewCategory}