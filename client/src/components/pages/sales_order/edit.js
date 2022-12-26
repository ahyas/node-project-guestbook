import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { motion } from "framer-motion";

const EditItem = () => {
    const location  = useLocation()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name:location.state.name,
        price:location.state.price,
        sub_qty:location.state.sub_qty,
        sub_total:location.state.sub_total
    })

    const back = () => {
        navigate(-1)
    }

    const resetFormValue = (current) => {
        setForm((prev)=>{
            return {...prev, ...current}
        })
    }

    const findSubtotal = () => {
        let price = form.price
        let qty = form.sub_qty
        let subtotal = price*qty
        form.sub_total = subtotal
        return form.sub_total
    }

    const params = useParams()

    const updateItem = async (e) => {
        e.preventDefault()
        const id = params.id
        console.log({id:id,sku:form.sku, name:form.name, sub_qty:form.sub_qty, sub_total:form.sub_total, change:form.change})
        await axios.patch(`http://localhost:5000/api/v1/sales_order/${id}/update`, {sub_qty:form.sub_qty, sub_total:form.sub_total}).then((response)=>{
            return back()
        }).catch((err)=>console.log(err))
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
            <Button variant="link" size="sm" onClick={()=>back()} style={{"marginBottom":"15px", "fontWeight":"bold", "textDecoration":"none","color":"red"}}>Cancel</Button>
            <Card>
                <Card.Header>Edit item</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateItem}>
                        <Form.Group className="mb-3">
                            <label><b>Name</b></label>
                            <input type="text" className="form-control" value={form.name} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label><b>Price</b></label>
                            <input type="text" className="form-control" id="price" value={form.price} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label><b>Qty</b></label>
                            <input type="number" className="form-control" id="qty" value={form.sub_qty} onChange={(e)=>resetFormValue({sub_qty:e.target.value})} autoFocus/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label><b>Subtotal</b></label>
                            <input type="text" className="form-control" value={findSubtotal()} readOnly/>
                        </Form.Group >
                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" style={{"marginTop":"15px"}}>Update</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </motion.div>
    )
}

export default EditItem