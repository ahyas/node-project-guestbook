import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/esm/Button";
import { Col, Row } from "react-bootstrap";

export default function Detail(){
    const [detail, setDetail] = useState([{
        sku:"",
        name:"",
        price:0,
        stock:0
    }])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/v1/products/${params.id}`).then((response)=>{    
                return setDetail(response.data)   
            }).catch((err)=>console.log(err)) 
        }

        getData()
    }, [params.id])

    const showData = () => {
        return(
            <Card>
                <Card.Body>
                    <h6 className="card-subtitle mb-2 text-muted">SKU</h6>
                    <p className="card-text">{detail[0].sku}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Name</h6>
                    <p className="card-text">{detail[0].name}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Price</h6>
                    <p className="card-text">{detail[0].price}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Stock</h6>
                    <p className="card-text">{detail[0].stock} Pcs</p>
                        <Form.Group className="d-grid gap-2">
                            <Button variant="primary" onClick={editProduct}>Edit</Button>
                            <Button variant="danger" onClick={deleteProduct}>Delete</Button>
                        </Form.Group>
                </Card.Body>
            </Card>
        )
    }

    const deleteProduct = async (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure you want to delete this?")){
            await axios.delete(`http://localhost:5000/api/v1/products/${params.id}`).then((response)=>{
                navigate('/products')
            }).catch((err)=>console.log(err))
        }
    }

    const editProduct = async () => {
        navigate(`/list/detail/${params.id}/edit`)
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
                <Card.Header>Detail Product</Card.Header>
                <Card.Body>
                    <Row>
                        <Col style={{"paddingBottom":"10px"}}>
                            <Link to={'/products'} style={{"fontWeight":"bold", "textDecoration":"none"}}>Back</Link>
                        </Col>
                    </Row>
                    
                        {showData()}

                </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}