import React from "react";
import { Grid, Text, Button, Input, Image } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
//addpostFB 액션실행을 위해 import
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";



const PostWrite = (props) => {
    const dispatch = useDispatch();
    const in_login = useSelector((state) => state.user.is_login);

    const post_list = useSelector((state) => state.post.list);
    // 리덕스에 있는 preview 데이터 가져오기
    const preview = useSelector((state) => state.image.preview);
    const { history } = props;

    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    // 수정페이지 : post_id 와 수정하려는 id가 일치한지확인
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    //post_id가 없을 경우 다시 페이지 이동
    React.useEffect(() => {
        if (is_edit && !_post) {
            window.alert('포스트 정보가 없어요!');
            console.log('포스트 정보가 없어요!');
            history.goBack();

            return;
        }
        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));
        }
        if (!is_edit) {
            dispatch(imageActions.setPreview(null));
        }

    }, []);



    const [contents, setContents] = React.useState(_post ? _post.contents : "");
    const [layout, setLayout] = useState("center");



    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const changeLayout = (e) => {
        setLayout(e.target.value)
    }


    // 버튼 클릭시 addPostFB로 contents정보 전송
    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout))
        window.alert("작성 완료되었습니다:)")
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents: contents, layout: layout }))

        window.alert("수정이 완료되었습니다:)")
    }

    if (!in_login) {
        return (
            <Grid margin="100px 0" padding="16px" center>
                <Text size="32px" bold >앗! 잠깐!</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 어요!</Text>
                <Button _onClick={() => { history.replace("/") }}>로그인 하러 가기</Button>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="36px" bold>{is_edit ? "게시글 수정" : "게시글 작성"}</Text>
                <Upload />
            </Grid>

            <Grid>
                <Grid padding="16px">
                    <Text size="24px" margin="0px" bold>미리보기</Text>
                </Grid>
            </Grid>

            <Grid margin="3em 0;">
                <Text size="1.5em;" margin="20px 0px" bold>레이아웃 선택</Text>
                <input
                    name="layout"
                    type="radio"
                    value="right"
                    onChange={changeLayout}
                    defaultChecked={setLayout === "right" ? true : false}
                /> 오른쪽
                <Grid is_flex margin="1em 0 2em 0;">
                    <Text width="50%;" center>{contents}</Text>
                    <Grid>
                        <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg'} />
                    </Grid>
                </Grid>
                <input
                    name="layout"
                    type="radio"
                    value="left"
                    onChange={changeLayout}
                    defaultChecked={setLayout === "left" ? true : false} />
                왼쪽
                <Grid is_flex margin="1em 0 2em 0;">
                    <Grid>
                        <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg'} />
                    </Grid>
                    <Text width="50%" center>{contents}</Text>
                </Grid>
                <input
                    name="layout"
                    type="radio"
                    value="center"
                    onChange={changeLayout}
                    defaultChecked={setLayout === "center" ? true : false}
                /> 중앙
                <Grid margin="1em 0 2em 0;">
                    <Text margin=" 2em 0;">{contents}</Text>
                    <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg'} />
                </Grid>
            </Grid>


            <Grid padding="16px">
                <Input
                    value={contents}
                    bold
                    _onChange={changeContents}
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    multiLine />
            </Grid>

            <Grid padding="16px">
                {is_edit ? (
                    <Button text="게시글 수정" bold _onClick={editPost}></Button>
                ) : (
                    <Button text="게시글 작성" bold _onClick={addPost}></Button>
                )}
            </Grid>


        </React.Fragment>
    )
}

export default PostWrite;

