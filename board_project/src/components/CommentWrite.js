import React from "react";

import { Grid, Button, Input } from "../elements";



const CommentWrite = () => {
    return (
        <React.Fragment>
            <Grid padding="16px" is_flex>
                <Input placeholder="댓글 내용을 입력해주세요 :)"></Input>
                <Button width="50px" margin="0px 5px">작성</Button>
            </Grid>
        </React.Fragment>
    )

}

export default CommentWrite