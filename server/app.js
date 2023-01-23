const express = require('express')
const app = new express()
const connectDB = require('./connectDB')
const cors = require('cors')
const {getAllproducts, saveProduct, getDetailProduct, findProduct, editProduct, updateProduct, deleteProduct} = require('./controllers/ProductController')
const {getSalesList, createSales, deleteSales} = require('./controllers/SalesController')
const {getList, insertProduct, deleteItem, updateItem} = require('./controllers/SalesDetailController')
const {getAllCategory, viewCategory} = require('./controllers/CategoryController')
const {saveUser} = require("./controllers/RegisterController")
const {checkLoginInfo} = require("./controllers/LoginController")
const {getAllKeperluan} = require("./controllers/KeperluanController")

require('dotenv').config()

const PORT = process.env.PORT

app.use(cors()) //connect front-end and backend resource
app.use(express.json())
  
app.listen(PORT, ()=>{
    connectDB(process.env.URI)
    console.log(`App is running on port ${PORT}`)  
})

app.use('/login', checkLoginInfo);

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

app.get("/api/v1/keperluan", getAllKeperluan)

app.post("/api/v1/register", saveUser)

module.exports = app