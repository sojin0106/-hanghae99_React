import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";


const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {

        console.log(id);

        if (id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요:)");
            return;
        }

        if (!emailCheck(id)) {
            window.alert("이메일 형식이 맞지않습니다.")
            return;
        }
        dispatch(userActions.loginFB(id, pwd))
    }


    return (
        <React.Fragment>
            <Text size="45px" bold padding="16px">로그인</Text>
            <Grid padding="16px">
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    _onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
            </Grid>
            <Grid padding="16px">
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    _onChange={(e) => {
                        setPwd(e.target.value);
                    }}
                />
            </Grid>

            <Grid padding="16px">
                <Button
                    text="로그인하기"
                    _onClick={() => {
                        console.log("로그인 했어!");
                        login()
                    }}></Button>
            </Grid>
        </React.Fragment>
    )
}




export default Login


