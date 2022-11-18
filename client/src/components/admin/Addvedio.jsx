import axios from 'axios';
import React from 'react'
import styled from "styled-components";
import Swal from 'sweetalert2';

export default function Addvedio() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageurl, setImageurl] = React.useState("");
  const [vediourl, setVediourl] = React.useState("");
  const url="https://streaminggserver.herokuapp.com";
 const uploadVedio = async (e) => {
    e.preventDefault();
  if(!title || !description || !category || !imageurl || !vediourl){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
        })
  }else{
    try {
        await axios.post(url+"/api/admin/uploadvedio",{
          title:title,
          description:description,
          category:category,
          thumbnailUrl:imageurl,
          videoUrl:vediourl
        }).then((res)=>{
            if(res.data){
                Swal.fire({
                    icon: 'success',
                    title: 'Vedio Added',
                    text: 'Vedio Added Successfully',
                    })
            }
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vedio Not Added!",
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
        <h1>Add Vedio</h1>
      </Heading>
        <Inputs type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} required />
        <TextArea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} required/>
        <Inputs type="text" placeholder="Category" onChange={(e)=>setCategory(e.target.value)} required />
        <Inputs type="text" placeholder="Image Url" onChange={(e)=>setImageurl(e.target.value)} required />
        <Inputs type="text" placeholder="Vedio Url" onChange={(e)=>setVediourl(e.target.value)} required />
        <Button type="button" onClick={uploadVedio}>Add Vedio</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  width: 800px;
  height: 500px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Inputs = styled.input`  
  width: 600px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const Heading = styled.div`
  width: 100%;
  height: 50px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  color: #fff;
`;

const TextArea = styled.textarea`
  width: 600px;
  height: 100px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
`;




