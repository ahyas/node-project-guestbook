import React, { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/esm/Container"
import {Card, Row, Col} from "react-bootstrap"
import { Link } from "react-router-dom"

export default function ShowItems() {
    const [list, setList] = useState([])

    useEffect(()=>{
        const getData = async () => {
            await axios.get('http://localhost:5000/api/v1/category').then((response)=>{
                setList(response.data)
            }).catch((err)=>console.log(err))
        }

        getData()
    },[])

    const setData = () => {
        return list.map((row, key)=>{
            return(
                <li className="list-group-item" key={key}>
                    <Link to={`/category/${row._id}/view`} style={{"textDecoration":"none"}}>
                        {row.name}
                    </Link>
                </li>
            )
        })
    }

    return(
        <>
            <Container>
                <Card className="card text-dark bg-light mb-3">
                    <Card.Header>Category</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col style={{"paddingBottom":"10px"}}>
                                <Link to={"/category"} style={{"textDecoration":"none", "fontWeight":"bold"}}>Add</Link>
                            </Col>
                        </Row>
                        <Card>
                            <ul className="list-group list-group-flush">
                                {setData()}
                            </ul>
                        </Card>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}