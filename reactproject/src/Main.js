import './App.css';
import "./Style.css";
import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { FaCircle } from "react-icons/fa"




const Main = (props) => {
    const history = useHistory();
    const list = props.list;

    return (
        <div className="container">
            <h1>나의 일주일은 ?</h1>
            <div id="wrap">
                <div className='listWrap'>
                    {list.map((day, index) => {
                        const random = Math.floor(Math.random() * 5) + 1;
                        return (
                            <Box className="list" key={index}>
                                {day}
                                <div>

                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1
                                        return (
                                            <label key={index + i}>
                                                <input
                                                    type="radio"
                                                    name="random"
                                                    value={ratingValue}
                                                    onClick={() => random(ratingValue)} />
                                                <FaCircle
                                                    className="star"
                                                    color={ratingValue <= (random) ? "#ffef2c" : "#e5e5e5"}
                                                    size={35} />
                                            </label>
                                        );
                                    })}
                                </div>
                                <Triangle onClick={() => { history.push({ pathname: "/review", state: day }) }}
                                    day={day}>
                                </Triangle>
                            </Box>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};



const Triangle = styled.div`
    appearance: none;
    background-color: transparent;
    border-color: transparent #050703;
    width: 0px;
    height: 0px;
    border-top-width: 1rem;
    border-top-style: solid;
    border-bottom-width: 1rem;
    border-bottom-style: solid;
    border-left-width: 1.6rem;
    border-left-style: solid;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin-top: -6px;
    margin-left: 8px;
`;
const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    width: 500px;
`;







export default Main;