import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import {Button, Row, Col} from "react-bootstrap"

export default function Edit(){
    const [form, setForm] = useState({
        sku:"",
        name:"",
        price:0,
        stock:0
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/v1/products/${params.id}`).then((response)=>{
                const val = response.data[0]
                return setForm({
                    sku:val.sku,
                    name:val.name,
                    price:val.price,
                    stock:val.stock,
                })
            }).catch((err)=>console.log(err))
        }

        getData()

    },[params.id])

    const resetValue = (current) => {
        setForm((prev)=>{
            //join prev and current value
            return {...prev, ...current}
        })
    }

    const updateForm = async (e) =>{
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:5000/api/v1/products/${params.id}`, form).then((response)=>{
                navigate(`/list/detail/${params.id}`)
            }).catch((err)=>console.log(err))
        } catch (error) {
            console.log(error)
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
            <Card className="card text-dark bg-light mb-3">
                <Card.Header>Edit product</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col style={{"paddingBottom":"10px"}}>
                                <Link to={`/list/detail/${params.id}`} style={{"textDecoration":"none","fontWeight":"bold"}}>Back</Link>
                            </Col>
                        </Row>
                        <Card>
                            <Card.Body>
                            <Form onSubmit={updateForm}>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>SKU</b></Form.Label>
                                    <Form.Control 
                                        type="text"
                                        className="form-control"
                                        value={form.sku}
                                        onChange={(e)=>resetValue({sku:e.target.value})}
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Label><b>Name</b></Form.Label>
                                    <Form.Control 
                                        type="text"
                                        className="form-control"
                                        value={form.name}
                                        onChange={(e)=>resetValue({name:e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Price</b></Form.Label>
                                    <Form.Control 
                                        type="number"
                                        className="form-control"
                                        value={form.price}
                                        onChange={(e)=>resetValue({price:e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Stock</b></Form.Label>
                                    <Form.Control 
                                        type="number"
                                        className="form-control"
                                        value={form.stock}
                                        onChange={(e)=>resetValue({stock:e.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group className="d-grid">
                                    <Button variant="primary" type="submit">Update</Button>
                                </Form.Group>
                            </Form>
                            </Card.Body>
                        </Card>
                </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}