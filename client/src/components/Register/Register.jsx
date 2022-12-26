import axios from "axios";
import React from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register(){
    const [form, setForm] = useState(
        {
            name:"",
            email:"",
            username:"",
            password:"",
            confirmPass:""
        }
    )

    const resetValue = (current) => {
        return setForm((prev)=>{
            return{...prev, ...current}
        })
    }

    const resetForm = (e) => {
        e.preventDefault()
        return setForm({
            name:"",
            email:"",
            username:"",
            password:"",
            confirmPass:""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(form.password === form.confirmPass){
            console.log("Lanjut")
            await axios.post('http://localhost:5000/api/v1/register', {name:form.name, email:form.email, username:form.email, password:form.password}).then((response)=>{
                console.log(response.data.msg)
                setForm({
                    name:"",
                    email:"",
                    username:"",
                    password:"",
                    confirmPass:""
                })
            }).catch((err)=>console.log(err))
        }else{
            console.log("Password and confirmation do not match")
        }
    }

    return(
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Card>
                            <Card.Header>User Registration</Card.Header>
                            <Card.Body>
                                <Link to={"/"}>Back</Link>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" value={form.name} onChange={(e)=>resetValue({name:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder="Email" value={form.email} onChange={(e)=>resetValue({email:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={form.password} onChange={(e)=>resetValue({password:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm password" value={form.confirmPass} onChange={(e)=>resetValue({confirmPass:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="d-grid gap-2">
                                        <Button variant="primary" type="submit">Submit</Button>
                                        <Button variant="danger" onClick={resetForm}>Reset</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}