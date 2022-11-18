import React,{useState}from 'react'
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Email() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const url="https://streaminggserver.herokuapp.com";
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
                })
        }else{
            try {
                await axios.post(url+"/api/users/send-email",{
                    email
                });
                localStorage.setItem("email",email);
                Swal.fire({
                    icon: 'success',
                    title: 'Email sent',
                    text: 'Please check your email',
                    })

                navigate("/verify-otp");
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    })
            }
        }
    }


  return (
    <Container>
        <Form>
            <FormTitle>Forgot Password</FormTitle>
            <Inputs type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required  />
            <Button type='button' onClick={handleSubmit}>Send Email</Button>
            <NewAccount>
                <A href="/login">Back to Login</A>
            </NewAccount>
        </Form>
    </Container>

  )
}

export default Email

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
    border: none;
    border-radius: 5px;
    background-color: #000;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
`;

const FormTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const NewAccount = styled.div`
    margin-top: 20px;

`;

const A = styled.a`
    color: #000;
    font-weight: 600;
    text-decoration: none;
`;




