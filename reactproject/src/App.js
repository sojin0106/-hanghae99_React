import "./Style.css";
import Main from './Main';
import Review from './Review';
import { Route } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import "./App.css"



function App() {
  const [list, setList] = React.useState(["월", "화", "수", "목", "금", "토", "일"]);
  return (
    <All>
      <Wrap>
        <Route path="/" exact>
        </Route>
        <Box>
          <Route path="/" exact>
            <Main list={list} />
          </Route>
          <Route path="/review" component={Review} />
        </Box>
      </Wrap>
    </All>
  );
}


const All = styled.div`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: stretch;
	align-content: stretch;

`
const Wrap = styled.div`
display: flex;
flex-direction: column;
width:1000px
height: 100%;
overflow-x: hidden;
overflow-y: auto;
  `;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0px;
  width: 100%;
`;

export default App;
