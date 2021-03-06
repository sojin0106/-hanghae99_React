import React from "react";
import styled from "styled-components";


const Text = (props) => {

    const { bold, color, size, children, margin, _onClick, is_flex, width } = props;

    const styles = { bold: bold, color: color, size: size, margin, _onClick: { _onClick }, is_flex, width }
    return (
        <P {...styles} onClick={_onClick}>
            {children}
        </P>
    )
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: '#222831',
    size: '14px',
    margin: false,
    _onClick: () => { },
    is_flex: false,
    width: false,
}


const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
    width: ${(props) => props.width};

`

export default Text;