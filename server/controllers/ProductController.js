const Product = require('../models/ProductModel')
const SalesDetail = require('../models/SalesDetailModel')

const getAllproducts = async (req, res) => {
    try {
        const list = await Product.find({})
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

const getDetailProduct = async (req, res) => {
    try {
        let {id} = req.params
        const list = await Product.find({_id:id})
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

const findProduct = async (req, res) => {
    try {
        let sku = req.body.sku
        let inv_number = req.body.inv_number
        
        const list = await Product.find({sku:sku})
        const id_product = list[0]._id
        const price = list[0].price

        let filter = {inv_number:inv_number, id_product:id_product},
        update = {inv_number:inv_number, id_product:id_product, $inc:{sub_qty:1, sub_total:price}, price:price},
        options = {upsert: true}
        //if data not exist insert otherwise update
        await SalesDetail.findOneAndUpdate(filter, update, options)
        
        res.json({msg:'Data found', data:list, count:list.length})
    } catch (error) {
        res.json(error)
    }
}

const saveProduct = async (req, res) => {
    try {
        await Product.create(req.body)
        res.json({msg:'success'})
    } catch (error) {
        res.json(error)
    }
}

const editProduct = async (req, res) => {
    try {
        const {id} = req.params
        const list = await Product.findById(id)
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        let {id} = req.params
        await Product.findByIdAndUpdate(id, req.body, {new:true})
        const list = await Product.find({})
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        let {id} = req.params
        await Product.findByIdAndDelete(id)
        const list = await Product.find({})
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getAllproducts, saveProduct, getDetailProduct, findProduct, editProduct, updateProduct, deleteProduct}