import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadDictFB, removeDictFB } from "./redux/modules/dict";



const Dict = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dict.list);



    React.useEffect(() => {
        dispatch(loadDictFB());
    }, []);



    return (

        <Container>
            {data.map((list, i) => {

                return (
                    <Article key={i}>
                        <Wrap className="word ">
                            <CardTitle>단어</CardTitle>
                            <CardText >{list.word}</CardText>
                        </Wrap>
                        <Wrap className="desc">
                            <CardTitle>설명</CardTitle>
                            <CardText >{list.desc}</CardText>
                        </Wrap>
                        <Wrap className="ex">
                            <CardTitle>예시</CardTitle>
                            <CardText className="blue" >{list.ex}</CardText>
                        </Wrap>

                        <BtnWrap>
                            <Button>수정</Button>
                            <Button onClick={() => {
                                dispatch(removeDictFB(list.id));
                                console.log(list.id)
                                history.push("/")
                            }}>삭제</Button>
                        </BtnWrap>
                    </Article>
                )

            })}

            <AddButton onClick={() => { history.push({ pathname: "/Add" }) }}>단어 추가</AddButton>

        </Container>
    )
}


const Wrap = styled.div`
   margin :20px;
`
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: center;
   
    gap: 10px;
    padding: 50px 0px;

    width: 1300px;
    margin: auto ; 
`

const Article = styled.div`
    border: solid 2px black;
    border-radius : 15px;
    width: 400px;
    height: 430px;
    margin:10px  
`

const CardTitle = styled.h3`
    font-size : 30px;
    display: flex;
    font-weight:700;
    margin-bottom:3px
`

const CardText = styled.span`
    font-size:20px; 
    padding: 10px;
    display: flex; 
    border: 1px solid #c4c4c4;
    font-weight:600;
`

const BtnWrap = styled.div`
    margin:30px
`

const Button = styled.button`
    margin: 10px;
    width:50px;
    padding:4px;
    border-radius:10px;
    background : #ffe0b1;
    border: 0;
    outline: 0;
    font-weight:500;
    font-size:20px;  
`

const AddButton = styled.button`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    background-color: rgb(7 7 7);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    right: 25px;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;

    font-size:30px
`



export default Dict;


