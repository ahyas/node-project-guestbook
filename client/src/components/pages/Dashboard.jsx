import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import {Container, Card, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function Dashboard(){
    const [items, setItems] = useState({
        token:"",
        username:""
    });

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('token'));
      if (items) {
       setItems(items);
      }
    }, []);

    return(
        <>
        <Container>
            <Card>
                <Card.Header>Dashboard</Card.Header>
                <Card.Body>
                    <h2>Dashboard</h2>
                    <p>Selamat datang {items.username} di Aplikasi Buku Tamu. Silahkan mengisi buku tamu pada link dibawah ini.</p>
                    <Link to={"/guestbook/new"}><Button variant="primary">Isi buku tamu</Button></Link>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}