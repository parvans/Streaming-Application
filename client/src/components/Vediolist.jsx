import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import Cards from './Cards';

function Vediolist() {
  const [videos, setVideos] = useState([]);
  const url="https://streaminggserver.herokuapp.com";
  const getvedios = async () => {
    try {
      await axios.get(url+"/api/users/getvedios",{
        // headers: {
        //   "x-access-token": localStorage.getItem("UserToken")
        // }
      }).then((res)=>{
        if(res.data){
          setVideos(res.data);
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getvedios();
  },[])
  return (
    <Container>
      <div className="row">
        <Title>
        <H1>Videos</H1>
        </Title>
        {videos.map((video,index) => (
          <div className="col-md-4 mt-4">
            <Cards
              key={index}
              imageurl={video.thumbnailUrl}
              title={video.title}
              description={video.description}
              category={video.category}
              id={video._id}
            />
          </div>
        ))}
      </div>

    </Container>
  )
}

export default Vediolist

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    
`;

const H1 = styled.h1`
    color: white;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
`;

const Title = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;



