import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import Dict from './Dict';
import Add from './Add';

import './App.css';



function App() {



  return (

    <div className="App">
      <Title>단어장</Title>
      <Switch>
        <Route exact path="/" component={Dict} />
        <Route exact path="/add" component={Add}></Route>

      </Switch>

    </div>
  );
}

const Title = styled.h1`
  fontWeight:600;
  padding-bottom: 20px ;
  border-bottom: 3px solid black;
  text-align : center;
  font-size:40px;
  margin-top:20px
  
`

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;


export default App;
