import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import {Container, Card, Form, Button, Stack} from "react-bootstrap"
import { useLocation } from "react-router-dom"
import axios from "axios"

export default function NewGuestbook(){
    const location = useLocation()

    const [list, setList] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            await axios.get("http://localhost:5000/api/v1/keperluan").then((response)=>{
                setList(response.data)
            }).catch((err)=>console.log(err))
        }
        getData()
    },[])


    const setData = () =>{
        return list.map((row, key)=>{
            return(
                <option value={row.description} key={key}>{row.description}</option>
            )
        })
    }

    return(
        <>
            <Container>
                <Card>
                    <Card.Header>Isi buku tamu</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Keperluan</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Pilih</option>
                                    {setData()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Keterangan</Form.Label>
                                <Form.Control as="textarea" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Selfie</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Stack direction="horizontal" gap={2}>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Stack>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}