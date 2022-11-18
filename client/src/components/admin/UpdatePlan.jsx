import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Swal from 'sweetalert2';

export default function UpdatePlan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const id=useParams().id
  const url="https://streaminggserver.herokuapp.com";
  const token = localStorage.getItem("UserToken");
  useEffect(() => {
    if(!token){
      navigate("/login");
    }
       axios.get(url+`/api/admin/getaplan/${id}`).then((res)=>{
        if(res.data){
          setName(res.data.name);
          setPrice(res.data.price);
          setDescription(res.data.description);
        }
      }).catch((err)=>{
        console.log(err.message);
      })
  }, [token]);

      const updatePlan=async()=>{
        try {
          await axios.put(url+`/api/admin/updateplan/${id}`,{
            name:name,
            price:price,
            description:description
          },
          // ,{
          //   headers: {
          //     "x-access-token": localStorage.getItem("UserToken")
          //   }
          ).then((res)=>{
            if(res.data){
              Swal.fire({
                icon: 'success',
                title: 'Plan Updated',
                text: 'Plan Updated Successfully',
                })
              navigate("/all-plan");
            }
          }).catch((err)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Plan Not Updated!",
              })
          })
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <Container>
      <Form>
        <Heading>
          <h1>Update Plan</h1>
        </Heading>
        <Inputs type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}  />
        <Inputs type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}  />
        <TextArea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <Button type="button" onClick={updatePlan}>Update Plan</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;

`

const Form = styled.form`
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    font-size: 2rem;
    font-weight: 500;
    color: #333;
  }
`;

const Inputs = styled.input`  
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;

  &:hover{
    cursor: pointer;
    background-color: #555;
  }
`;
