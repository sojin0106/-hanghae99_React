import React from "react";
import { Grid, Image, AddImg, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";




const LifePost = (props) => {
    const dispatch = useDispatch();
    const postDel = (post_id) => {
        dispatch(postActions.deletePostFB(post_id))
    }


    // 좋아요 만들기
    const [like, setLike] = React.useState(true);

    const likeClick = () => {
        if (like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }

    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex padding="16px">
                    <Grid is_flex width="auto">
                        <Image shape="circle" src={AddImg} />
                        <Text bold margin="10px">{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex>
                        <Grid is_flex >
                            <Text bold>{props.insert_dt}</Text>
                            {/* user 정보가 있는 경우에만 수정버튼 보이게 하기 */}
                            {props.is_me &&
                                <Button padding="4px" width="auto" margin="4px" _onClick={() => {
                                    history.push(`/write/${props.id}`);
                                }}>
                                    수정
                                </Button>}
                            {props.is_me &&
                                <Button padding="4px" width="auto" margin="4px" _onClick={() => { postDel(props.id); }}>
                                    삭제
                                </Button>}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    <Wrap>
                        <Image shape="rectangle" src={props.image_url} />
                        <TextWrap>
                            <Text size="16px" bold >{props.contents}</Text>
                        </TextWrap>
                    </Wrap>
                </Grid>

                <Grid padding="16px" is_flex>

                    {like ? ( // ***
                        <Span>좋아요<Like onClick={(event) => {
                            event.stopPropagation();
                            likeClick()
                        }
                        }>🤍</Like></Span>
                    ) : (
                        <Span>좋아요<Like onClick={(event) => {
                            event.stopPropagation();
                            likeClick()
                        }}>❤️</Like></Span>
                    )}
                    <Text bold>댓글 {props.comment_cnt}개</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

// 부모에서 정보를 받아오지 못한경우 오류 발생을 방지하기 위해 사용
LifePost.defaultProps = {
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



export default LifePost


const Wrap = styled.div`
   width: 100%;
    height: 100%;
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

const Span = styled.span`
    display: flex;
    align-items: center;
`

const Like = styled.div`
  font-size : 25px;
  cursor: pointer;
`