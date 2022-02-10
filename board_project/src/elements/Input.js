import React from "react";
import styled from "styled-components"
import { Text, Grid } from "../elements";


const Input = (props) => {
    const { label, placeholder, _onChange, type, multiLine, value } = props;

    if (multiLine) {
        return (
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                <ElTextarea
                    rows={10}
                    value={value}
                    placeholder={placeholder}
                    onChange={_onChange}
                ></ElTextarea>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid>
                <Text margin="0px">{label}</Text>
                <ElInput
                    type={type}
                    placeholder={placeholder}
                    onChange={_onChange}
                ></ElInput>
            </Grid>

        </React.Fragment>
    )
}


Input.defaultProps = {
    multiLine: false,
    label: false,
    placeholder: '텍스트 입력해주세요.',
    type: "text",
    value: "",
    // 변하는 텍스트 값을 부모컴퍼넌트가 알고 리덕스에 저장하기 위해서 함수 작성
    _onChange: () => { },
}

const ElTextarea = styled.textarea`
    border: 1px solid #212121;
    width:100%;
    padding: 12px 4px;
    box-sizing: border-box;
`

const ElInput = styled.input`
    border: 1px solid #212121;
    width:100%;
    padding: 12px 4px;
    box-sizing: border-box;
`

export default Input;