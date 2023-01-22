import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {Container, Form, Card, Button} from "react-bootstrap"
import { Link } from 'react-router-dom';

async function loginUser(credentials) {
    console.log(credentials)
    // await axios.post("http://localhost:5000/login", credentials).then((data)=>{
    //     console.log(data.json())
    //     return data.json()
    // }).catch((err)=>console.log(err))
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((data) => data.json()
    ).catch((err)=>console.log(err))
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await loginUser({username,password});
        
        setToken(token);
    }

    return(
        <Container>
            <Card>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="d-grid gap-2">
                            <Button variant="primary" type="submit">Login</Button>
                            <Link to={'/register'} >Register</Link>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}