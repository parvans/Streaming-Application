import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://streaminggserver.herokuapp.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
    } else {
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and Confirm Password should be same!",
        });
      } else {
        try {
          await axios.post(url+"/api/users/reset-password", {
            email:email,
            password:password,
            confirmpassword:confirmPassword
          }).then((res)=>{
            if(res.data){
                Swal.fire({
                    icon: "success",
                    title: "Password Reset",
                    text: "Password reset successfully",
                  });
        
                  navigate("/login");
        
            }
          }).catch((err)=>{
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    }
  };

  return (
    <Container>
      <Form>
        <FormTitle>Reset Password</FormTitle>
        <Inputs type="password" placeholder="New Password" onChange={(e)=>setPassword(e.target.value)} required />
        <Inputs type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} required />
        <Button type="button" onClick={handleSubmit}>Reset</Button>
        <NewAccount>
          <A href="/login">Back to Login</A>
        </NewAccount>
      </Form>
    </Container>
  );
}

export default ResetPassword;

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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const NewAccount = styled.div`
  margin-top: 10px;
`;

const A = styled.a`
  text-decoration: none;
  color: #000;
`;

const FormTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;
