import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import {motion} from 'framer-motion'

const Checkout = () => {
    const [form, setForm] = useState({
        inv_number:"",
        grand_total:0,
        grand_qty:0,
        amount:0,
        change:0
    })

    const location  = useLocation()

    useEffect(()=>{
        setForm({
            inv_number:location.state.inv_number,
            grand_total:location.state.grand_total,
            grand_qty:location.state.grand_qty,
            amount:0,
            change:0
        })
    },[location.state.inv_number, location.state.grand_total, location.state.grand_qty])

    const resetForm = (current) => {

        setForm((prev)=>{
            //console.log(...prev, ...current)
            return {...prev, ...current}
        })
    }

    const findChange = () => {
        let grand_total = form.grand_total
        let amount = form.amount
        let change = amount - grand_total
        if(change>0){
             
            return form.change = change
        }else{
            
            return form.change = 0
        }
    }

    const navigate = useNavigate()

    const processSales = async (e) => {
        e.preventDefault()
        let inv_number = form.inv_number
        let grand_total = form.grand_total
        let grand_qty = form.grand_qty
        let amount = form.amount
        let change = form.change
        
        if(window.confirm("Are you sure you want to proceed?")){
            await axios.post('http://localhost:5000/api/v1/sales',{inv_number:inv_number, grand_total:grand_total, grand_qty:grand_qty, amount:amount, change:change}).then((response)=>{
                console.log(response.data.msg)
                return navigate('/sales_order')
            }).catch((err)=>console.log(err))
        }
        
    }

    const back = () => {
        navigate(-1)
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
            <Button variant="link" size="sm" onClick={()=>back()} style={{"fontWeight":"bold","color":"red","textDecoration":"none"}}>Cancel</Button>
            <Card>
                <Card.Header>Checkout</Card.Header>
                <Card.Body>
                    <Form onSubmit={processSales}>
                        <input type="hidden" id="inv_number" value={form.inv_number} readOnly/>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Grand total</b></Form.Label>
                            <Form.Control type="text" value={form.grand_total} id="grand_total" readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Grand qty</b></Form.Label>
                            <Form.Control type="text" value={form.grand_qty} id="grand_qty" readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Amount</b></Form.Label>
                            <Form.Control type="text" id="amount" value={form.amount} onChange={(e)=>resetForm({amount:e.target.value})} autoFocus/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Change</b></Form.Label>
                            <Form.Control type="text" id="change" value={findChange()} readOnly/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" id="btnSubmit" >Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}

export default Checkout