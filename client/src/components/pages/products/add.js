import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Add = () => {
    let number = (Math.random())
    let str_number = number.toString()
    let sku = str_number.slice(2,15)
    
    const [form, setForm] = useState({
        sku:sku,
        name:'',
        price:0,
        stock:0
    })

    const navigate = useNavigate()

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        })
    }

    const resetForm = (e) => {
        e.preventDefault()
        document.getElementById('sku').focus()
        return setForm({sku:'', name:'', price:0, stock:0})
    }

    const saveProduct = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/v1/products`, {
            sku:form.sku, 
            name:form.name, 
            price:form.price, 
            category:"", 
            brand:"",
            stock:form.stock
        }).then((response)=>{
            navigate('/products')
        }).catch((err)=>console.log(err))
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
                <Card.Header>Add product</Card.Header>
                <Card.Body>
                <Link to={'/products'} style={{"color":"red"}}><b>Cancel</b></Link>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="card-subtitle mb-2 text-muted"><b>SKU</b></Form.Label>
                        <Form.Control 
                            type="text"
                            id="sku"
                            value={form.sku}
                            onChange={(e)=>resetValue({sku:e.target.value})}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="card-subtitle mb-2 text-muted"><b>Name</b></Form.Label>
                        <Form.Control
                            type="text"
                            value={form.name}
                            onChange={(e)=>resetValue({name:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="card-subtitle mb-2 text-muted"><b>Price</b></Form.Label>
                        <Form.Control 
                            type="number"
                            value={form.price}
                            onChange={(e)=>resetValue({price:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="card-subtitle mb-2 text-muted"><b>Stock</b></Form.Label>
                        <Form.Control 
                            type="number"
                            value={form.stock}
                            onChange={(e)=>resetValue({stock:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="d-grid gap-2">
                        <Button variant="primary" onClick={saveProduct}>Save</Button>
                        <Button variant="danger" onClick={resetForm}>Reset</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}

export default Add