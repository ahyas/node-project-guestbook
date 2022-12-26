const Sales = require('../models/SalesModel')
const SalesDetail = require('../models/SalesDetailModel')

const getSalesList = async (req, res) => {
    try {
        const list = await Sales.find({})
        res.json(list)
    } catch (error) {
        res.json(error)
    }
}

const createSales = async (req, res) => {
    try {
        await Sales.create(req.body)
        res.json({msg:'Success'})
    } catch (error) {
        res.json(error)
    }
}

const deleteSales = async (req, res) => {
    try {
        let {inv_number} = req.params
        console.log(inv_number)
        await Sales.deleteOne({inv_number:inv_number})
        await SalesDetail.deleteMany({inv_number:inv_number})
        res.json({msg:'Success'})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getSalesList, createSales, deleteSales}