import { React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { addDictFB } from "./redux/modules/dict"
import './App.css';




const Add = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const wordInput = useRef();
    const descInput = useRef();
    const exInput = useRef();

    const dict = useSelector((state) => state.dict.list);
    console.log(dict);


    const addDictList = () => {
        const add_list_state = {
            word: wordInput.current.value,
            desc: descInput.current.value,
            ex: exInput.current.value,
        }

        dispatch(addDictFB(add_list_state))

    }

    return (

        <div>
            <Container>
                <CardTitle>단어</CardTitle>
                <Input type="text" ref={wordInput} />
                <CardTitle>설명</CardTitle>
                <Input type="text" ref={descInput} />
                <CardTitle>예시</CardTitle>
                <Input type="text" ref={exInput} />
            </Container>

            <Btn onClick={addDictList}>추가하기</Btn>
            <Btn onClick={() => { history.push({ pathname: "/" }) }}>되돌아가기</Btn>
        </div>
    )


}


export default Add;


const Container = styled.div`
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;

    margin-top : 50px
`

const Btn = styled.button`
    width:100px;
    height:35px;
    border: 0;
    outline: 0;
    margin:50px 20px;
    background : #ffe0b1;
    border-radius:10px;
    font-weight:700;
    font-size:20px;
`

const Input = styled.input`
    width:300px;
    height: 30px;

    margin: 30px auto;
    padding: 10px;

    border: none;
    background-color: transparent;
    outline: none;
    border-bottom : solid 2px black;

    font-size : 25px;
`;

const CardTitle = styled.h3`
    display: flex;
    margin-bottom:3px;    

    font-size : 30px;
    font-weight:700;
`

