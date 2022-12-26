import React from "react"
import {Container, Card} from "react-bootstrap"

export default function Dashboard(){
    return(
        <>
        <Container>
            <Card>
                <Card.Header>Dashboard</Card.Header>
                <Card.Body>
                    <h2>Dashboard</h2>
                    <p>Welcome to dasboard</p>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}