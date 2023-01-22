import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import {Container, Card} from "react-bootstrap"

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
                    <p>Welcome to dasboard</p>
                    <p>{items.username}</p>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}