// bict.js
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";


// Actions


const CREATE = 'dict/CREATE'; // 추가기능 , 너때문이였어
const LOAD = 'dict/LOAD';
const UPDATE = 'dict/UPDATE';
const REMOVE = 'dict/REMOVE';


const initialState = {
    list: [
        // {
        //     id: "1",
        //     word: "단어입니다.",
        //     desc: "설명입니다.",
        //     ex: "예시입니다."
        // },
        // {
        //     id: "2",
        //     word: "단어입니다.",
        //     desc: "설명입니다.",
        //     ex: "예시입니다."
        // },
        // {
        //     id: "3",
        //     word: "단어입니다3.",
        //     desc: "설명입니다3.",
        //     ex: "예시입니다3."
        // },

    ],
}

export function loadDict(dict_list) {
    return { type: LOAD, dict_list };
};

export function createDict(dict) {
    console.log("액션")
    return { type: CREATE, dict: dict };
}

export function updateDict(dict_index) {
    console.log("수정 버킷", dict_index)
    return { type: UPDATE, dict_index };
};

export function removeDict(dict_id) {
    console.log("지울 버킷", dict_id)
    return { type: REMOVE, dict_id };
};

// middlewares 
export const loadDictFB = () => {
    return async function (dispatch) {
        const dict_data = await getDocs(collection(db, "dictionary"));
        // console.log(dict_data);

        let dict_list = [];

        dict_data.forEach((doc) => {
            // console.log(doc.id, doc.data());
            dict_list.push({ id: doc.id, ...doc.data() });
        })
        // console.log(dict_list);

        dispatch(loadDict(dict_list))
    }

}

export const addDictFB = (dict) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "dictionary"), dict);
        // const _dict = await getDoc(docRef);
        const dict_data = { id: docRef.id, ...dict }
        // console.log((await getDoc(docRef)).data());
        console.log(dict_data);
        window.alert("추가 완료!")

        dispatch(createDict(dict_data))

    }
}

// 수정




// 삭제
export const removeDictFB = (dict_id) => {
    return async function (dispatch, getState) {
        if (!dict_id) {
            window.alert("아이디가 없어요")
            return;
        }

        const docRef = doc(db, "dictionary", dict_id)
        await deleteDoc(docRef);

        const _dict_list = getState().dict.list;

        const dict_index = _dict_list.findIndex((b) => {
            return b.id === dict_id;
        });
        console.log(dict_index)

        dispatch(removeDict(dict_index));
        dispatch(loadDictFB(dict_index));
    }


}







// Reducer
// export default function reducer(state = initialState, action = {}) {
//     switch (action.type) {
//         case "dict/CREATE": {
//             console.log("된거니");
//             const new_dict_list = [...state.list, action.dict]
//             return { list: new_dict_list }

//         }
//         default:
//             return state;
//     }
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "dict/LOAD": {
            return { list: action.dict_list };
        }
        case "dict/CREATE": {
            console.log("값 변경 된거니?");
            const new_dict_list = [...state.list, action.dict];
            return { list: new_dict_list };
        }
        case "dict/REMOVE": {
            const new_dict_list = state.list.filter(({ dict_id }) => {
                return dict_id !== action.id;

            });
            console.log(new_dict_list)
            return { list: new_dict_list };
        }
        default:
            return state;
    }
}
export default reducer;

