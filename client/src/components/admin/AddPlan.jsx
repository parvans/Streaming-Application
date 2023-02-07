import React, { useState } from 'react'
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";

export default function AddPlan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const url="https://streaminggserver.herokuapp.com";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !price || !description){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
        })
    }else{
      try {
        await axios.post(url+"/api/admin/createplan",{
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
              title: 'Plan Added',
              text: 'Plan Added Successfully',
              })
            navigate("/all-plan");
          }
        }).catch((err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Plan Not Added!",
            })
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Container>
      <Form>
        <Heading>
          <h1>Add Plan</h1>
        </Heading>
        <Inputs type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} required />
        <Inputs type="number" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} required />
        <TextArea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} required/>
        <Button type="button" onClick={handleSubmit}>Add Plan</Button>
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


