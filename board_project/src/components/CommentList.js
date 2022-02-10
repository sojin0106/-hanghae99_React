import React from "react";
import { Grid, Text, Image, AddImg } from "../elements";


const CommentList = () => {
    return (
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </Grid>
        </React.Fragment>
    )

}

export default CommentList


const CommentItem = (props) => {

    const { user_profile, user_name, user_id, post_id, insert_dit, contents } = props;
    return (

        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image shape="circle" src={AddImg} />
                <Text bold>{user_name}</Text>
            </Grid>
            <Grid is_flex margin="0px 4px">
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insert_dit}</Text>
            </Grid>
        </Grid>

    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "jinny",
    user_id: "",
    post_id: 1,
    contents: "아무 내용, 자고싶네, 잠온다",
    insert_dit: '2021-02-06 12:57:00'
}