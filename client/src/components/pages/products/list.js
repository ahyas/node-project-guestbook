import axios from 'axios'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { Card, Container } from 'react-bootstrap';

export default function List(){
    const [list, setList] = useState([])

    useEffect(()=>{
        const getData = async () => {
            await axios.get('http://localhost:5000/api/v1/products').then((response)=>{
                return setList(response.data)
            }).catch((err)=>console.log(err))
        }

        getData()
        
    }, [list.length])


    const showData = () => {
        return list.map((row, key)=>{
            return(
                <li className="list-group-item" key={key} style={{"padding":"20px"}}>
                    <h6 className="card-subtitle mb-2 text-muted">{row.sku} ({row.stock})</h6>
                    <p className='card-text' style={{"maxWidth":"80%"}}><Link className='card-link' to={`/list/detail/${row._id}`} style={{'textDecoration':'none'}}>{row.name}</Link></p>
                    
                    <p className="card-text text-muted" style={{"textAlign":"right", "lineHeight":"0","paddingTop":"15px"}}>Normal price: Rp {row.price}</p>
                    <p className="card-text text-muted" style={{"textAlign":"right"}}>Promo price: Rp - </p>
                </li>
            )
        })
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
            <Card className='card text-dark bg-light mb-3'>
                <Card.Header>List of products</Card.Header>
                <Card.Body>
                    <Link to={'/list/add'}><button className='btn btn-primary btn-sm' style={{'marginBottom':'15px'}}>Add</button></Link>
                    <Card>
                        <ul className="list-group list-group-flush">
                            {showData()}
                        </ul>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    </motion.div>
    )
}