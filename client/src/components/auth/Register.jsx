import React from 'react'
import styled from "styled-components";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
function Register() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const navigate = useNavigate();
    const url="https://streaminggserver.herokuapp.com";
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password || !confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
              })
        }else if(password !== confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password and Confirm Password should be same!',
                })
        }else{
            try {
                await axios.post(url+"/api/users/register",{
                    name,
                    email,
                    password
                }).then((res)=>{
                    console.log(res.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: "User Registered Successfully!",
                          })
                        navigate("/login");
                }).catch((err)=>{
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "User Already Exists!",
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
            <FormTitle>Sign Up</FormTitle>
            <Inputs type="text" placeholder="Username" onChange={(e)=>setName(e.target.value)} required />
            <Inputs type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
            <Inputs type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
            <Inputs type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} required />
            <Button type='button' onClick={handleSubmit}>Sign Up</Button>
            <NewAccount>
                <A href="/login">Already have an account?</A>
            </NewAccount>
        </Form>
    </Container>
    
  )
}

export default Register

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
    width: 400px;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

const Inputs = styled.input`
    width: 300px;
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

const FormTitle = styled.h1`
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 20px;
`;

const A = styled.a`
    text-decoration: none;
    color: #000;
    font-size: 14px;
    font-weight: 500;
`;

const NewAccount = styled.div`
    width: 300px;
    height: 40px;
    margin: 10px 1;
    display: flex;
    justify-content: center;
`;



    
