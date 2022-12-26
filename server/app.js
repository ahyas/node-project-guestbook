const express = require('express')
const app = new express()
const connectDB = require('./connectDB')
const cors = require('cors')
const {getAllproducts, saveProduct, getDetailProduct, findProduct, editProduct, updateProduct, deleteProduct} = require('./controllers/ProductController')
const {getSalesList, createSales, deleteSales} = require('./controllers/SalesController')
const {getList, insertProduct, deleteItem, updateItem} = require('./controllers/SalesDetailController')
const {getAllCategory, viewCategory} = require('./controllers/CategoryController')
const UserModel = require("./models/UserModel")
const {saveUser} = require("./controllers/RegisterController")
const {encrypt, decrypt, compare} = require("n-krypta")
const bcrypt = require("bcryptjs")

require('dotenv').config()

const PORT = process.env.PORT

app.use(cors()) //connect front-end and backend resource
app.use(express.json())

let number = (Math.random())
    let str_number = number.toString()
    let token = str_number.slice(2,15)

app.use('/login', async (req, res) => {

    console.log("Paijo "+req.body.username) 

    UserModel.find( { username: { $exists: true, $in:[req.body.username] } }, function(err, data){
        if(err) {
            return false
        }
        //if data not found
        if(data.length===0){
            res.send({token: null})
            return false
        }
        //compare password from DB
        bcrypt.compare(req.body.password, data[0].password, function(err, result){
            if(err){
                return false
            }

            if(result===true){
                res.send({token: token})
            }else{
                res.send({token: null})
            }
            
        })

    })
});
  
app.listen(PORT, ()=>{
    connectDB(process.env.URI)
    console.log(`App is running on port ${PORT}`)  
})

app.get('/api/v1/products', getAllproducts)
app.post('/api/v1/products', saveProduct)
app.get('/api/v1/products/:id', getDetailProduct)
app.put('/api/v1/products/:id', editProduct)
app.patch('/api/v1/products/:id', updateProduct)
app.delete('/api/v1/products/:id', deleteProduct)

app.get('/api/v1/category', getAllCategory)
app.get('/api/v1/category/:id', viewCategory)

app.get('/api/v1/sales', getSalesList)
app.post('/api/v1/sales', createSales)
app.delete('/api/v1/sales/:inv_number', deleteSales)

app.get('/api/v1/sales_order/:inv_number', getList)
app.post('/api/v1/sales_order', insertProduct)
app.post('/api/v1/sales_order/upsert', findProduct)
app.delete('/api/v1/sales_order/:id/delete', deleteItem)
app.patch('/api/v1/sales_order/:id/update', updateItem)

app.post("/api/v1/register", saveUser)

module.exports = app