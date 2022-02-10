import React from "react";
import styled from "styled-components";


const Image = (props) => {

    const { shape, src, size, _onClick } = props;

    const styles = {
        src: src,
        size: size,
    }

    if (shape === "circle") {
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }
    if (shape === "rectangle") {
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }


    return (
        <React.Fragment>
            <ImageDefault {...styles} onClick={_onClick} />
        </React.Fragment>
    )

}

Image.defaultProps = {
    shape: "circle",
    src: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/5mazSO7Ouexw-TZN0tmlrXXUj30.JPG",
    size: 36,
    _onClick: () => { },
}

const ImageDefault = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover; // 이미지 크기 맞추기
`


const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover; // 이미지 크기 맞추기
    margin : 4px;
`

const AspectOutter = styled.div`
    width : 100%;
    min-width; 250px;

`

const AspectInner = styled.div`
    position : relative;
    padding-top : 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover; // 이미지 크기 맞추기
`



export default Image;