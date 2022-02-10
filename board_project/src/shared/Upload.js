import React from "react";
import { Button } from "../elements";
import { storage } from "./firebase";

import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload = (props) => {
    const dispatch = useDispatch();
    //업로드 중일때 버튼 클릭 막기
    const is_uploading = useSelector(state => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files);

        console.log(fileInput.current.files[0]);

        // file 객체에 내용물 읽어와서 미리보기에 뿌려주기
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        console.log(file)

        reader.readAsDataURL(file);

        // 읽기가 끝난 다음 발생하는 이벤트
        //  postWrite 페이지에 미리보기로 띄우기 위해서는  일단 리덕스에 저장 -> <modules : image> 에서 액션 만들기
        reader.onloadend = () => {
            console.log(reader.result);
            //dispatch 로 미리보기 띄우기
            dispatch(imageActions.setPreview(reader.result));
        }

    }

    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
        }

        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    };



    return (
        <React.Fragment>
            {/* disabled 속성사용해서 사진 업로드 중에 버튼 클릭 막기 */}
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}


export default Upload;