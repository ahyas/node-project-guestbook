import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

const Detail = () => {
    const [table, setTable] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/v1/sales_order/${location.state.inv_number}`).then((response)=>{
                return setTable(response.data)
            }).catch((err)=>console.log(err))
        }

        getData()
    },[table, location.state.inv_number])

    const setData = () => {
        return table.map((row, key)=>{
            return(
                <tr key={key}>
                    <td>{row.product_info.sku}</td>
                    <td>{row.product_info.name}</td>
                    <td>{row.product_info.price}</td>
                    <td>{row.sub_qty}</td>
                    <td>{row.sub_total}</td>
                </tr>
            )
        })
    }

    const deleteSales = async (inv_number) => {
        if(window.confirm('Are you sure you want to delete this?')){
            await axios.delete(`http://localhost:5000/api/v1/sales/${inv_number}`).then((response)=>{
               navigate(-1)
            }).catch((err)=>console.log(err))
        }
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
                <Button variant="link" size="sm" onClick={()=>{navigate(-1)}} style={{"fontWeight":"bold","color":"red","textDecoration":"none"}}>Cancel</Button>
                <Card>
                    <Card.Header>
                        Cart detail
                    </Card.Header>
                    <Card.Body>
                        <Button variant="danger" size="sm" onClick={()=>deleteSales( location.state.inv_number)} style={{"marginBottom":"20px"}}>Delete</Button>
                        <Button variant="success" size="sm" style={{"float":"right", "marginLeft":"5px"}} data-toggle="modal" data-target="#exampleModal">PDF</Button> 
                        <Button className="btn btn-success btn-sm" style={{"float":"right"}}>Excel</Button>
                        <Card.Text><b>Invoice: </b>{location.state.inv_number}</Card.Text>
                            <Table bordered size="sm">
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {setData()}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4" style={{"textAlign":"center"}}><b>Total</b></td>
                                        <td><b>{location.state.grand_total}</b></td>
                                    </tr>
                                </tfoot>
                            </Table>
                    </Card.Body>
                </Card>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </Container>
        </motion.div>        
    )
}

export default Detail