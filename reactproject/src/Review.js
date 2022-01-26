import React, { useState } from "react";
import { FaCircle } from "react-icons/fa"
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "./Style.css";
import "./App.css"

const StarRating = ({ location }) => {
    const day = location.state;
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const history = useHistory();
    return (

        <div className="containerReview">
            <Border>
                <div className="day">
                    <span className="dayColor">{day}요일</span> 평점 남기기
                </div>

                <div className="listWrap">
                    {[...Array(5)].map((start, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label>
                                <input type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />

                                <FaCircle
                                    className="circle"
                                    color={ratingValue <= (hover || rating) ? "#ffef2c" : "#e5e5e5"}
                                    size={35}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>

                <Btn onClick={() => { history.goBack(); }}>
                    평점 남기기
                </Btn>
            </Border>
        </div>
    )
}




const Border = styled.div`
    text-align: center;
    width: 250px;
    margin: auto;
`;

const Btn = styled.button`
    width: 150px;
    height: 40px;
    background-color: rgb(59, 59, 59);
    border: none;
    border-radius: 5px;
    padding: 1rem;
    color: black;
    margin: 30px auto;
    font-size: 17px;
    font-weight: 600;
    line-height: 15px;
    cursor: pointer;
    color: white;
`;

export default StarRating;

