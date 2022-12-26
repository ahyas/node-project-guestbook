import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const Lookup = () => {
    const navigate = useNavigate() 
    
    const [table, setTable] = useState([])
    useEffect(()=>{
        const getData = () =>{
            axios.get('http://localhost:5000/api/v1/products').then((response)=>{
                setTable(response.data)
            }).catch((err)=>console.log(err))
        }
        
        return getData()
    },[table])

    const location = useLocation()

    const chooseItem = async (id_product, sub_qty, price, sub_total) => {
        await axios.post('http://localhost:5000/api/v1/sales_order',{inv_number:location.state.inv_number, id_product:id_product, sub_qty:sub_qty, price:price, sub_total:sub_total}).then((response)=>{
            navigate(-1) //back to previous page
        }).catch((err)=>console.log(err))
    }

    const setData = () => {
        let sub_qty = 1

        return table.map((row, i)=>{
             return(
                <tr key={i}>
                    <td>{row.sku}</td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={()=>chooseItem(row._id, sub_qty, row.price, row.price)}>Choose</button></td>
                </tr>
            )
        })
    }

    const back = () => {
        navigate(-1)
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
                <Button variant="link" size="sm" onClick={()=>back()} style={{"fontWeight":"bold","color":"red","textDecoration":"none"}}>Cancel</Button>
                    <Card>
                        <Card.Header>
                            Lookup product
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {setData()}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
            </Container>
        </motion.div>
    )
}

export default Lookup