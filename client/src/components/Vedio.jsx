import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Vedio() {
    const [video, setVideo] = useState([]);
    const id=useParams().id
    console.log(id);
    const url="https://streaminggserver.herokuapp.com"
    useEffect(() => {
        axios.get(url+`/api/users/getvedio/${id}`)
        .then((res)=>{
            setVideo(res.data)
            console.log(video.videoUrl);
        })
        .catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                })
        })
    }, [url])

    
  return (
    <Container>
        <Content>
            <H1>Video Title</H1>
            <Video src={video.videoUrl} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Video>
        </Content>
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

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    color: white;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const Video = styled.iframe`
    width: 800px;
    height: 500px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;



