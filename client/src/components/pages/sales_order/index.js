import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
import axios from "axios"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const SalesOrder = () => {
    const [table, setTable] = useState([])
    
    useEffect(()=>{
        const getData = async () => {
            await axios.get('http://localhost:5000/api/v1/sales').then((response)=>{
                
                return setTable(response.data)
            }).catch((err)=>console.log(err))
        }
        getData()
    },[table])

    const navigate = useNavigate()

    const setData = () => {
        return table.map((row, key)=>{
            return(
                <tr key={key}>
                    <td>{row.inv_number}</td>
                    <td>{row.grand_qty}</td>
                    <td>{row.grand_total}</td>
                    <td>{row.amount}</td>
                    <td>{row.change}</td>
                    <td><Button variant="warning" size="sm" onClick={()=>navigate('/sales_order/detail', {state:{inv_number:row.inv_number, grand_total:row.grand_total}})}>Detail</Button></td>
                </tr>
            )
        })
    }

    const invNumber = () => {
        let count = table.length+1
        let inv_number = "INV-"+count
        return inv_number
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
            <Card>
                <Card.Header>Sales order</Card.Header>
                <Card.Body>
                    <Link to={{pathname:'/sales_order/new'}} state={{inv_number:invNumber()}}>
                        <Button variant="primary" size="sm" style={{"marginBottom":"20px"}}>New</Button>
                    </Link>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>INV</th>
                                <th>Grand qty</th>
                                <th>Grand total</th>
                                <th>Amount</th>
                                <th>Change</th>
                                <th>Actions</th>
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

export default SalesOrder