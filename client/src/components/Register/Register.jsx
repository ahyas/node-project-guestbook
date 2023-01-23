import axios from "axios";
import React from "react";
import { useState } from "react";
import { Card, Container, Form, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Register(){
    const [form, setForm] = useState(
        {
            name:"",
            email:"",
            no_hp:"",
            alamat:"",
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
            no_hp:"",
            alamat:"",
            username:"",
            password:"",
            confirmPass:""
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(form.password === form.confirmPass){
            console.log("Lanjut")
            await axios.post('http://localhost:5000/api/v1/register', {name:form.name, email:form.email, no_hp:form.no_hp, alamat:form.alamat, username:form.email, password:form.password}).then((response)=>{
                setForm({
                    name:"",
                    email:"",
                    no_hp:"",
                    alamat:"",
                    username:"",
                    password:"",
                    confirmPass:""
                })
                navigate(`/`)
            }).catch((err)=>console.log(err))
        }else{
            console.log("Password and confirmation do not match")
        }
    }

    return(
        <>
            <Container>
            <Card>
                <Card.Header>User registration</Card.Header>
                    <Card.Body>
                        <Link to={"/"}>Back</Link>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nama lengkap</Form.Label>
                                <Form.Control type="text" placeholder="Name" value={form.name} onChange={(e)=>resetValue({name:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" value={form.email} onChange={(e)=>resetValue({email:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No. HP</Form.Label>
                                <Form.Control type="text" value={form.no_hp} onChange={(e)=>resetValue({no_hp:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Alamat / Kantor asal</Form.Label>
                                <Form.Control as="textarea" value={form.alamat} onChange={(e)=>resetValue({alamat:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={form.password} onChange={(e)=>resetValue({password:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Konfirmasi Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" value={form.confirmPass} onChange={(e)=>resetValue({confirmPass:e.target.value})}/>
                            </Form.Group>
                           
                            <Stack direction="horizontal" gap={2}>
                                <Button variant="primary" type="submit">Submit</Button>
                                <Button variant="danger" onClick={resetForm}>Reset</Button>
                            </Stack>
                        </Form>
                    </Card.Body>
            </Card>
            </Container>
        </>
    )
}