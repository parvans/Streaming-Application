import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import Swal from 'sweetalert2';

export default function PlanCard({id, title, description, price}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const decoded = jwt_decode(localStorage.getItem("UserToken"));
    const url = "https://streaminggserver.herokuapp.com";
    // console.log(decoded.id);
    const handleSubscribe = async() => {
      await axios.post(url+"/api/users/subscribe",{
        id: decoded.id,
        plan: id
      }).then((res)=>{
        if(res.data){
          // console.log(res.data);
          localStorage.setItem("UserToken", res.data);
          Swal.fire({
            icon: 'success',
            title: 'Subscribed',
            text: 'You have subscribed to this plan',
          })
          navigate('/vedio-list')
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    }

    const Admin=()=>{
    if(decoded.isAdmin===true){
        setIsAdmin(true);
    }
    }

    const updatePlan = () => {
      navigate(`/update-plan/${id}`)
    }
    const deletePlan = async() => {
      try {
        await axios.delete(url+`/api/admin/deleteplan/${id}`).then((res)=>{
          if(res.data){
            Swal.fire({
              icon: 'success',
              title: 'Plan Deleted',
              text: 'Plan Deleted Successfully',
              })
            navigate("/all-plan");
          }
        }).catch((err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Plan Not Deleted!",
            })
        })
      } catch (error) {
        console.log(error);
      }
    }
useEffect(() => {
   Admin();
  // handleSubscribe();
}, [])
  return (
    <Card>
    <CardBody>
      <CardItem>
        <CardItemTitle>
          <h1>{title}</h1>
        </CardItemTitle>
        <CardItemPrice>
          <h1>₹ {price}</h1>
        </CardItemPrice>
        <CardItemDescription>
          <p>{description}</p>
        </CardItemDescription>
        {!isAdmin&&<CardItemButton>
          <Button type="button" onClick={handleSubscribe}>Subscribe</Button>
        </CardItemButton>}
      </CardItem>
    </CardBody>
    {isAdmin &&
    <CardFooter>
      <UpdateButton type="button" onClick={updatePlan}>Update</UpdateButton>
      <DeleteButton type="button" onClick={deletePlan}>Delete</DeleteButton>
    </CardFooter>}

  </Card>

  )
}

const Card = styled.div`
    width: 400px;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);

    &:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }

`;

  

const CardBody = styled.div`
    width: 100%;
    height: 350px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardItem = styled.div`
    width: 300px;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

const CardItemTitle = styled.div`   
    width: 100%;
    height: 50px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #fff;
`;

const CardItemPrice = styled.div`
    width: 100%;
    height: 50px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

const CardItemDescription = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardItemButton = styled.div`
    width: 100%;
    height: 50px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    
`;

const Button = styled.button`
    width: 200px;
    height: 40px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    outline: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
    }
`;

const CardFooter = styled.div`
    width: 100%;
    height: 50px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
`;

const UpdateButton = styled.button`
    width: 100px;
    height: 40px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    outline: none;
    background-color: green;
    color: #fff;
    cursor: pointer;
`;

const DeleteButton = styled.button` 
    width: 100px;
    height: 40px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    outline: none;
    background-color: red;
    color: #fff;
    cursor: pointer;
`;



