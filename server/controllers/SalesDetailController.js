const SalesDetail = require('../models/SalesDetailModel')

const getList = async (req, res) => {
    try {
        let {inv_number} = req.params
        await SalesDetail.aggregate([
            {
                $match:{
                    'inv_number':inv_number
                }
            },
            {
                $addFields:{
                    'id_product':{$toObjectId:'$id_product'}
                }
            },
            {
                $lookup: {
                    from:'products',
                    localField:'id_product',
                    foreignField:'_id',
                    as:'product_info'
                }
            },
            {
                $unwind:'$product_info'
            },
            {
                $project:{'inv_number':1, 'product_info.sku':1,'product_info.name':1, 'product_info.price':1, 'sub_qty':1, 'sub_total':1}
            }
        ], (err, data)=>{
            res.json(data)
        })
    } catch (error) {
        res.json(error)
    }
}

const insertProduct = async (req, res) => {
    try {
        
        let filter = {inv_number:req.body.inv_number, id_product:req.body.id_product},
        update = {inv_number:req.body.inv_number, id_product:req.body.id_product, $inc:{sub_qty:1, sub_total:req.body.price}, price:req.body.price},
        options = {upsert: true}
        //if data not exist insert otherwise update
        await SalesDetail.findOneAndUpdate(filter, update, options)
        res.json({msg:'Success'})
    } catch (error) {
        
        res.json(error)
    }
}

const updateItem = async (req, res) => {
    try {
        await SalesDetail.findByIdAndUpdate(req.params.id, req.body, {new:true})
        
        res.json({msg:'Success'})
    } catch (error) {
        res.json(error)
    }
}

const deleteItem = async (req, res) => {
    try {
        let {id} = req.params
        await SalesDetail.findByIdAndDelete(id)
        res.json({msg:'Success'})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getList, insertProduct, updateItem, deleteItem}