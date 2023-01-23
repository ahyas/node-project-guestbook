import React,{useState, useEffect} from "react"
import { Container, Card, Button} from "react-bootstrap"
import axios from "axios"
import { Link, useNavigate, useLocation} from "react-router-dom"

export default function ListKeperluan(){
    const navigate = useNavigate()

    const [list, setList] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            await axios.get("http://localhost:5000/api/v1/keperluan").then((response)=>{
                setList(response.data)
            }).catch((err)=>console.log(err))
        }
        getData()
    },[])

    const chooseItem = (keperluan) => {
        return navigate(-1, {state:{keperluan:keperluan}})
    }

    const setData = () =>{
        return list.map((row, key)=>{
            return(
                <li className="list-group-item" key={key}><Button variant="link" onClick={()=>chooseItem(row.description)}>{row.description}</Button></li>
            )
        })
    }

    return(
        <>
            <Container>
                <Card className="card text-dark bg-light mb-3">
                    <Card.Header>Category</Card.Header>
                    <Card.Body>
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