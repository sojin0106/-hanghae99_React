import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";


// 사진 업로드 후 preview 사진 없애주기
import { actionCreators as imageActions } from "./image";



const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST"

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
// reducer가  사용하게 될 initialState
const initialState = {
    list: [],
    // 무한스크롤
    paging: { star: null, next: null, size: 3 },
    is_loading: false,
}

// post 1개에 대해서 기본적으로 들어가줘야하는 list
const initialPost = {
    // 이미 user_redux에 있는 데이터 사용
    // id: 0,
    // user_info: {
    //     user_name: "jinny",
    //     user_profile: "",
    // },
    image_url: "http://file3.instiz.net/data/cached_img/upload/2021/12/01/10/388607e6d3fe3ed253d4491fb5a900c9.jpg",
    contents: "춘식이네요오오❤️",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), // moment사용 : 내장된 format 사용해서 형식 만들어 주기
};

const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {


        if (!post_id) {
            console.log("게시물 정보가 없어요!");
            return;
        }
        const _image = getState().image.preview;


        const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
        const _post = getState().post.list[_post_idx];

        // 수정할 컬렉션
        const postDB = firestore.collection("post")

        if (_image === _post.image_url) {
            postDB.doc(post_id).update(post).then(doc => {
                dispatch(editPost(post_id, { ...post }))
                history.replace("/")
            })
            return;
        } else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                // getTime() -> 괄호 빠져서 중복파일명이 만들어지면 게시글 작성시 다 똑같은 이미지로 게시되었음. ()의 중요성....
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, 'data_url');

            _upload.then(snapshot => {
                snapshot.ref
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        dispatch(imageActions.uploadImage(url));
                        return url;

                    }).then(url => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then(doc => {
                                dispatch(editPost(post_id, { ...post, image_url: url }))
                                history.replace("/")
                            });

                    }).catch((err) => {
                        window.alert("앗! 이미지 업로드에 문제가 있어요!");
                        console.log("앗! 이미지 업로드에 문제가 있어요 :(", err);
                    })


            })

        }
    }
}


const addPostFB = (contents = " ", layout) => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post")
        console.log(layout)
        //추가해야하는 정보
        // 스토어에 있는 정보가져오기
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile
        }
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
            layout: layout,
            like_cnt: 0,
            like_list: [],

        }




        // user_info & _post 정보 파이어스토어에 저장
        // 파이어베이스 컬렉션안에 저장할때 ~~~.add({추가 정보})
        // 1. 컬렉션 선택부터 하기 const postDB = firestore.collection("post")
        // 2. 우리가 원하는 정보가 맞는지 console.log 로 확인
        // 3. postDB에 저장하기
        // 4. addPost 액션 사용해서 리덕스에 저장하기 -> 리덕스와 파이어베이스 데이터 저장 형태 맞춰주기
        // 5. handleActions [ADD_POST]로 가서 액션 추가

        // console.log({ ...user_info, ..._post });


        // 이미지 업로드를 위해 getState(스토어에 접근할수있게 도와주는 메서드) 사용해서 image에 들어있는 preview 가지고 오기
        const _image = getState().image.preview;

        // 가져온 image 타입 확인
        // console.log(_image);
        // console.log(typeof _image); // 문자열

        // 파이어베이스 공식문서에 문자열 파일 업로드 방법 보기
        // ref(`파일명 / user_id_업데이트시간`)을 조합해서 중복파일명 안생기게 만들기

        const _upload = storage
            // getTime() -> 괄호 빠져서 중복파일명이 만들어지면 게시글 작성시 다 똑같은 이미지로 게시되었음. ()의 중요성....
            .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
            .putString(_image, 'data_url');

        _upload.then(snapshot => {
            snapshot.ref
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    dispatch(imageActions.uploadImage(url));
                    return url;

                }).then(url => {
                    postDB.add({ ...user_info, ..._post, image_url: url, layout: layout }).then((doc) => {
                        //리덕스와 파이어베이스 데이터 저장 형태 맞춰주기
                        let post = { user_info, ..._post, id: doc.id, image_url: url, layout: layout };
                        dispatch(addPost(post));
                        history.replace("/");

                        // 업로드 끝난 후 preview 사진 없애주기
                        dispatch(imageActions.setPreview(null));

                    }).catch((err) => {
                        window.alert("앗! 포스트 작성에 문제가 있어요! ");
                        console.log("post 작성에 실패했어요!", err);
                    });
                }).catch((err) => {
                    window.alert("앗! 이미지 업로드에 문제가 있어요!");
                    console.log("앗! 이미지 업로드에 문제가 있어요 :(", err);
                })


        })

    }
}



const getPostFB = (start = null, size = 3) => {
    return function (dispatch, getState, { history }) {
        let _paging = getState().post.paging;

        if (_paging.start && !_paging.next) {
            return;
        }

        //무한 스크롤
        dispatch(loading(true));
        const postDB = firestore.collection("post");

        let query = postDB.orderBy('insert_dt', 'desc');

        if (start) {
            query = query.startAt(start)
        }

        query
            .limit(size + 1)
            .get()
            .then(docs => {
                let post_list = []

                let paging = {
                    start: docs.docs[0],
                    next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
                    size: size,
                }

                docs.forEach((doc) => {

                    //두번째 방법

                    let _post = doc.data();

                    // key들을 배열로 만들어 주기 : ['comment_cnt', 'contents', ....]
                    let post = Object.keys(_post).reduce((acc, cur) => {

                        if (cur.indexOf("user_") !== -1) {
                            return {
                                ...acc,
                                user_info: { ...acc.user_info, [cur]: _post[cur] }
                            };
                        }
                        return { ...acc, [cur]: _post[cur] };
                    },
                        { id: doc.id, user_info: {} }

                    );
                    post_list.push(post)

                })

                post_list.pop();

                //setPost에 넣어주기
                dispatch(setPost(post_list, paging));

            })


        return;

        //파이어베이스 데이터 받아오기
        // postDB.get().then((docs) => {
        //     let post_list = []

        //     docs.forEach((doc) => {

        //         //두번째 방법

        //         let _post = doc.data();

        //         // key들을 배열로 만들어 주기 : ['comment_cnt', 'contents', ....]
        //         let post = Object.keys(_post).reduce((acc, cur) => {

        //             if (cur.indexOf("user_") !== -1) {
        //                 return {
        //                     ...acc,
        //                     user_info: { ...acc.user_info, [cur]: _post[cur] }
        //                 };
        //             }
        //             return { ...acc, [cur]: _post[cur] };
        //         },
        //             { id: doc.id, user_info: {} }

        //         );
        //         post_list.push(post)

        //     })
        //     console.log(post_list);
        //     //setPost에 넣어주기
        //     dispatch(setPost(post_list));
        // })

        // //첫번째 방법
        // // 데이터 복사
        // let _post = {
        //     id: doc.id,
        //     ...doc.data()
        // };
        // // 파이어베이스 데이터와 initialPost 형태 맞춰주기
        // let post = {
        //     id: doc.id,
        //     user_info: {
        //         user_name: _post.user_name,
        //         user_profile: _post.user_profile,
        //         user_id: _post.user_id,
        //     },
        //     image_url: _post.image_url,
        //     contents: _post.contents,
        //     comment_cnt: _post.comment_cnt,
        //     insert_dt: _post.insert_dt,
        // };
        //  // post_list에 배열추가
        //   post_list.push(post)

    }
}


const deletePostFB = (post_id, url) => {
    return async function (dispatch, getState, { history }) {
        if (!post_id) {
            console.log("게시물 정보가 없어요!");
            return;
        }

        const postDB = firestore.collection("post")

        postDB
            .doc(post_id)
            .delete()
            .then((doc) => {
                console.log("게시물 삭제 성공");
                postDB
                    .get({})
                    .then((docs) => {
                        const post_list = [];

                        docs.forEach((doc) => {
                            post_list.push(doc.data());

                        });
                        dispatch(deletePost(post_list));
                        console.log(post_list)
                        window.location.replace("/")
                    })
                    .catch((err) => {
                        console.log("게시물 삭제 실패", err);
                    });
            });


        // const docRef = doc(postDB, "post", post_id)
        // await deleteDoc(docRef)

        // dispatch(deletePost(post_id))
        // history.replace('/')

    };
};



// immer 사용해서 불변성 유지
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            // action으로 넘어온 post_list 넣어주기
            draft.list.push(...action.payload.post_list);

            // post_id가 같은 중복 항목을 제거합시다! :)
            draft.list = draft.list.reduce((acc, cur) => {
                // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
                // 있으면? 덮어쓰고, 없으면? 넣어주기!
                if (acc.findIndex((a) => a.id === cur.id) === -1) {
                    return [...acc, cur];
                } else {
                    acc[acc.findIndex((a) => a.id === cur.id)] = cur;
                    return acc;
                }
            }, []);

            draft.paging = action.payload.paging;
            draft.is_loading = false;
        }),

        [ADD_POST]: (state, action) => produce(state, (draft) => {
            //게시물 맨 앞으로 정렬 unshift 사용
            draft.list.unshift(action.payload.post)
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

            draft.list[idx] = { ...draft.list[idx], ...action.payload.post }
        }),
        [LOADING]: (state, action) => produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading;
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            draft.list = draft.list.filter((p, i) => p.id !== action.payload.post_id)


        }),
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    editPostFB,
    deletePostFB,
}

export { actionCreators };