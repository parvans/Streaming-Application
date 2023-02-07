import React, { useEffect } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const url="https://streaminggserver.herokuapp.com";
    useEffect(() => {
        if(localStorage.getItem("UserToken")){
            navigate("/vedio-list");
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
                })
        }else{
            try {
                await axios.post(url+"/api/users/login",{
                    email,
                    password
                }).then((res)=>{
                    if(res.data){
                        localStorage.setItem("UserToken",res.data);
                        const decoded = jwt_decode(res.data);
                        // console.log(decoded);
                        if(decoded.isAdmin===true){
                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successfull',
                                text: 'Welcome Admin',
                                })
                            navigate("/add-video");
                        }else{
                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successfull',
                                text: 'Welcome User',
                                })
                            navigate("/vedio-list");
                        }
                    }
                }).catch((err)=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "User Not Found!",
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
            <FormTitle>Sign In</FormTitle>            
            <Inputs type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
            <Inputs type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
            <Passwordforgot>
                <A href="/email-send">Forgot Password?</A>
            </Passwordforgot>
            <Button type="button" onClick={handleSubmit}>Sign In</Button>
            <NewAccount>
                <A href="/register">Create a new account</A>
            </NewAccount>
        </Form>
    </Container>

  );
}

export default Login;

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

const Passwordforgot = styled.div`
    width: 300px;
    height: 40px;   
    margin: 10px 1;
    display: flex;
    justify-content: flex-end;
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
    margin: 10px 0;
    display: flex;
    justify-content: center;
`;




