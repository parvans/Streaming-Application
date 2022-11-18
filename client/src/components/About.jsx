import React from 'react'
import styled from "styled-components";

function About() {
  return (
    <Container>
        <Content>
            <H1>About</H1>
            <P>
            At C Stream, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games. Our members control what they want to watch, when they want it, with no ads, in one simple subscription. We're streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world's biggest fans of entertainment, and we're always looking to help you find your next favorite story.
            </P>
        </Content>
    </Container>

  )
}

export default About

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

const Content = styled.div`
    width: 100em;
    height: auto;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

const H1 = styled.h1`
    font-size: 30px;
    margin-bottom: 20px;
    color: white;

`;

const P = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
    color: white;
`;

