import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function ViewCategory(){
    const params = useParams()

    const [detail, setDetail] = useState([
        {name:""}
    ])

    useEffect(()=>{
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/v1/category/${params.id}`).then((response)=>{
                setDetail(response.data)
            }).catch((err)=>console.log(err))
        }

        getData()

    },[params.id])

    const showData = () => {
        return(
            <Card>
                <Card.Body>
                    <h6 className="card-subtitle mb-2 text-muted">Category Name</h6>
                    <p className="card-text">{detail.name}</p>
                    <Form.Group className="d-grid gap-2">
                        <Button variant="primary" size="sm" >Edit</Button>
                        <Button variant="danger" size="sm" >Delete</Button>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }

    return(
        <>
        <Container>
            <Card className="card text-dark bg-light mb-3">
                <Card.Header>
                    View Category
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col style={{"paddingBottom":"10px"}}>
                            <Link to={"/category"} style={{"textDecoration":"none", "fontWeight":"bold"}}>Back</Link>
                        </Col>
                    </Row>
                    {showData()}
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}