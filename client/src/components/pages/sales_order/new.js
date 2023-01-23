import { Link, useLocation, useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
import { useEffect, useState } from "react"
import axios from "axios"
import Button from 'react-bootstrap/Button'
import Table from  'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const NewSalesOrder = () => {
    const [invNumber, setInvNumber] = useState("")
    const [table, setTable] = useState([])
    const [barcode, setBarcode] = useState({value:""})

    const location = useLocation()

    useEffect(()=>{
        return setInvNumber(location.state.inv_number)
    },[location.state.inv_number])

    useEffect(()=>{
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/v1/sales_order/${location.state.inv_number}`).then((response)=>{
                //console.log(response.data.length)
                
                if(response.data.length === 0){
                    document.getElementById("process").disabled = true
                }else{
                    document.getElementById("process").disabled = false
                }
                return setTable(response.data)
                
            }).catch((err)=>console.log(err))
        }
        getData()
    }, [table, location.state.inv_number])

    useEffect(()=>{
        const getData = async () => {
            await axios.post(`http://localhost:5000/api/v1/sales_order/upsert`, {inv_number:invNumber, sku:barcode.value}).then((response)=>{
                if(response.data.count === 1){
                    //reset field
                    setBarcode({value:""})
                }
            }).catch((err)=>console.log(err))
        }

        getData()
    },[barcode, invNumber])

    const deleteRow = async (id) => {
        if(window.confirm('Are you sure you want to delete this?')){
            await axios.delete(`http://localhost:5000/api/v1/sales_order/${id}/delete`).then((response)=>{
                console.log(response.data.msg)
            }).catch((err)=>console.log(err))
        }
        //await axios.delete(`http://localhost:5000/api/v1/sales_order/:`)
    }

    const setData = () => {
        return table.map((row, key)=>{
            return(
                <tr key={key}>
                    <td>{row.product_info.sku}</td>
                    <td><Link style={{'textDecoration':'none'}} to={`/sales_order/new/${row._id}/edit`} state={{name:row.product_info.name, price:row.product_info.price, sub_qty:row.sub_qty, sub_total:row.sub_total}}>{row.product_info.name}</Link></td>
                    <td>{row.product_info.price}</td>
                    <td>{row.sub_qty}</td>
                    <td>{row.sub_total}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={()=>deleteRow(row._id)}>Delete</button></td>
                </tr>
            )
            
        })
    }

    const grandTotal = () => {
        let sum = 0
        for(let a=0; a<table.length; a++){
            sum=sum+table[a].sub_total
        }
        
        return(
            <span id="grand_total">{sum}</span>
        )
    }

    const grandQty = () => {
        let grand_qty = 0
        for(let a=0; a<table.length; a++){
            grand_qty=grand_qty+table[a].sub_qty
        }

        return grand_qty
    }

    const navigate = useNavigate()
    
    const processSales = () => {
        let inv_number = document.getElementById("inv_number").value
        let grand_total = document.getElementById("grand_total").innerHTML
        let grand_qty = document.getElementById("grand_qty").value
        
        navigate('/sales_order/new/checkout', {state:{inv_number:inv_number, grand_total:grand_total, grand_qty:grand_qty}})
    }

    const resetBarcodeValue = (current) => {
        setBarcode((prev)=>{
            return {...prev, ...current}
        })
    }
    
    return(
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
        <Container>
            <Button variant="link" size="sm" onClick={()=>navigate(-1)} style={{"marginBottom":"15px", "fontWeight":"bold", "textDecoration":"none","color":"red"}}>Cancel</Button>
            <Card>
                <Card.Header>Shoping cart</Card.Header>
                <Card.Body>
                    <input type="text" value={invNumber} style={{"marginBottom":"15px"}} id="inv_number" readOnly/>
                    <h1 style={{"float":"right"}}>{grandTotal()}</h1>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Scan barcode here" aria-describedby="basic-addon2" autoFocus value={barcode.value} onChange={(e)=>resetBarcodeValue({value:e.target.value})}/>
                            <Link to={'/sales_order/new/lookup'} state={{inv_number:invNumber}}>
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Lookup</button>
                            </Link>
                        </div>
                    <input type="hidden" value={grandQty()} id="grand_qty" readOnly/>
                    <div style={{"overflowY": "scroll", "height":"350px"}}>
                        <Table striped bordered hover size="sm">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">@Price</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Subtotal</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setData()}
                            </tbody>
                        </Table>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="success" id="process" style={{"float":"right"}} onClick={()=>processSales()}>Process</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}

export default NewSalesOrder