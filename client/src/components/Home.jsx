import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Wave } from "react-animated-text";
function Home() {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(false);
    }
  }, []);
  return (
    <Container>
        <Content>
          <H1>
            <Wave text="Welcome to" effect="stretch" effectChange={2.0} />
          </H1>
          <H2>
            <Wave text="C Stream" effect="stretch" effectChange={2.0} />
          </H2>
          {logIn && (<HomeButtoms onClick={() => navigate("/login")}>Get Started</HomeButtoms>)}
          
        </Content>
    </Container>
  );
}
export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
   background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const HomeButtoms = styled.button`
  width: 200px;
  font-size: 20px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const H1 = styled.h1`
    font-size: 100px;
    color: red;
    text-align: center;
`;

const H2 = styled.h2`
    font-size: 50px;
    color: red;
    text-align: center;
`;


const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
