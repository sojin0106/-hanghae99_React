import React from 'react';
import './App.css'
import { BrowserRouter, Route } from "react-router-dom"
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Search from './Search';
import Notification from '../pages/Notification';
import LeftPost from '../components/LeftPost';
import RightPost from '../components/RightPost';


import Header from '../components/Header';
import { Grid, Button } from '../elements';
import Permit from "./Permit";

import styled from "styled-components"


// 새로고침으로 날라간 로그인값 다시 리덕스에 저장하기 -> user.js 미들웨어 만들기
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user"
import { apiKey } from "./firebase"

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key) ? true : false

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }

  }, []);


  return (

    <React.Fragment>
      <Wrap>
        <Grid >
          <Header></Header>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
            <Route path="/post/:id" exact component={PostDetail} />
            <Route path="/leftpost/:id" exact component={LeftPost} />
            <Route path="/rightpost/:id" exact component={RightPost} />
            <Route path="/search" exact component={Search} />
            <Route path="/noti" exact component={Notification} />
          </ConnectedRouter>
        </Grid>
        <Permit>
          <Button is_float text="+" _onClick={() => { history.push('/write') }}></Button>
        </Permit>
      </Wrap>
    </React.Fragment>

  );
}

export default App;


const Wrap = styled.div`
  max-width: 780px;
  margin: auto;

`