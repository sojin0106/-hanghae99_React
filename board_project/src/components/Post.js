import React from "react";
import { Grid, Image, AddImg, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import { actionCreators as likeActions } from "../redux/modules/like";





const Post = (props) => {
    const dispatch = useDispatch();
    const postDel = (post_id) => {
        dispatch(postActions.deletePostFB(post_id))
    }


    const user_id = useSelector((state) => state.user.user?.uid);
    console.log(props)

    // 좋아요 만들기
    const [like, setLike] = React.useState(false);

    const likeClick = (props) => {
        const post_id = props.id; // 게시물 정보 
        const like_cnt = props.like_cnt; // 좋아요 갯수
        const post_user_id = props.user_info.user_id; // 게시물 작성자
        const like_list = props.like_list; // 좋아요 누른 사람들 아이디

        console.log(props)


        // 게시물 작성자인 지 체크
        if (post_user_id === user_id) {
            window.alert("작성자의 게시물에는 좋아요를 누르실 수 없습니다.");
            return;
        }
        if (like) {
            // 안좋아요
            setLike(false);
            // 좋아요 해제하면 firebase, redux에 like_cnt - 1
            dispatch(likeActions.minusLikeFB(post_id, like_cnt, like_list));

        } else {
            // 좋아요
            setLike(true);
            // 좋아요를 누르면 firebase, redux에 like_cnt + 1
            dispatch(likeActions.addLikeFB(post_id, like_cnt, like_list));
        }
    };



    return (
        <React.Fragment>
            <Grid>
                <Grid padding="16px">
                    <Grid is_flex >
                        <Wrap>
                            <Image shape="circle" src={props.user_info.image_url} />
                            <Text bold margin="10px">{props.user_info.user_name}</Text>
                        </Wrap>
                        <Wrap>
                            <Text bold>{props.insert_dt}</Text>
                        </Wrap >

                    </Grid>

                    <Container>

                        {/* user 정보가 있는 경우에만 수정버튼 보이게 하기 */}
                        {props.is_me &&
                            <Button padding="4px" width="auto" margin="4px" _onClick={(event) => {
                                event.stopPropagation();
                                history.push(`/write/${props.id}`);
                            }}>
                                수정
                            </Button>}
                        {props.is_me &&
                            <Button padding="4px" width="auto" margin="4px" _onClick={(event) => {
                                event.stopPropagation();
                                postDel(props.id);
                            }}>
                                삭제
                            </Button>}

                    </Container>
                    <Wrap>
                        {(props.layout === "right") && (
                            <Grid padding="16px">
                                <Wrap>
                                    <TextWrap>
                                        <Text size="16px" bold >{props.contents}</Text>
                                    </TextWrap>
                                    <Image shape="rectangle" src={props.image_url} />
                                </Wrap>
                            </Grid>
                        )}

                        {(props.layout === "left") && (
                            <Grid padding="16px">
                                <Wrap>
                                    <Image shape="rectangle" src={props.image_url} />
                                    <TextWrap>
                                        <Text size="16px" bold >{props.contents}</Text>
                                    </TextWrap>
                                </Wrap>
                            </Grid>
                        )}
                        {(props.layout === "center") && (
                            <Grid>
                                <Grid padding="16px">
                                    <Text size="16px" bold>{props.contents}</Text>
                                </Grid>
                                <Grid padding="16px">
                                    <Image shape="rectangle" src={props.image_url} />
                                </Grid>

                            </Grid>
                        )}
                    </Wrap>
                </Grid>


                {/*  좋아요 & 댓글  */}
                <Grid padding="16px" is_flex>

                    {/* {like ? ( // ***
                        <Span>좋아요<Like onClick={(event) => {
                            event.stopPropagation();
                            likeClick()
                        }}>🤍</Like>{props.like_cnt}</Span>
                    ) : (
                        <Span>좋아요<Like onClick={(event) => {
                            event.stopPropagation();
                            likeClick()
                        }}>❤️</Like></Span>
                    )} */}

                    <Like
                        onClick={(e) => {
                            e.stopPropagation();
                            likeClick(props);
                        }}
                    >
                        ❤️ {props.like_cnt}
                    </Like>

                    <Text bold>댓글 {props.comment_cnt}개</Text>
                </Grid>

            </Grid>
        </React.Fragment>
    )
};

// 부모에서 정보를 받아오지 못한경우 오류 발생을 방지하기 위해 사용
Post.defaultProps = {
    user_info: {
        user_name: "jinny",
        user_profile: { AddImg },
    },
    image_url: { AddImg },
    contents: "춘식이네요오오❤️",
    comment_cnt: 10,
    insert_dt: "2021-02-04 03:58",
    is_me: false,
}



export default Post


const Span = styled.span`
    display: flex;
    align-items: center;
`

const Like = styled.div`
  font-size : 25px;
  cursor: pointer;
`

const Wrap = styled.div`
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
`

const TextWrap = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;;
`


const Container = styled.div`
    display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: flex-start;
	align-content: stretch;
`
