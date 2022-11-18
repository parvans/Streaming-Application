import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlanCard from "./PlanCard";

export default function AllPlans() {
    const [plans, setPlans] = useState([]);        
    const url="https://streaminggserver.herokuapp.com";
    const handleAllPlans = async () => {
        try {
            await axios.get(url+"/api/admin/getallplans",{
                // headers: {
                //     "x-access-token": localStorage.getItem("UserToken")
                // }
            }).then((res)=>{
                if(res.data){
                    // console.log(res.data);
                    setPlans(res.data);
                }
            }).catch((err)=>{
                console.log(err.message);
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        handleAllPlans();
    }, []);
  return (
    <Container>
        <div className="row">
            <Title>
                <H1>All Plans</H1>
            </Title>
            {plans.map((plan,index) => (
                <div className="col-md-4 mt-4">
                    <PlanCard
                        key={index}
                        title={plan.name}
                        description={plan.description}
                        price={plan.price}
                        id={plan._id}
                    />
                </div>
            ))}
        </div>
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    height: auto;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://techweez.com/wp-content/uploads/2020/01/streaming-services.jpg");
    background-repeat: no-repeat;
    background-size: cover;
`;

const Title = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    font-size: 2rem;
    color: #fff;
    font-weight: 700;
`;

