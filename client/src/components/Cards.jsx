import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

export default function Cards({imageurl, title, description,id, category}) {
    const navigate = useNavigate();
    const decoded = jwt_decode(localStorage.getItem("UserToken"));
    const handleVedio = () => {
        if(decoded.subscribed===true){
            navigate(`/vedio/${id}`)
        }else{
            navigate(`/all-plan`)
        }
    }
  return (
    <Card  style={{ width: "18rem" }}>
    <Card.Img variant="top" src={imageurl} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Text>{category}</Card.Text>
      <Button variant="primary" type='button' onClick={handleVedio}>Watch</Button>
    </Card.Body>
  </Card>

  )
}
