import { GET_USERS, GET_USER,SET_USER_LOADING, SAVE_QUESTION_ANSWER } from "../actions/types";

const initialState={

    isAuthenticated:false,
    loading:false,
    user:{},
    users:[]
};

const userReducer=(state=initialState,action)=>{

    switch(action.type){
        case SET_USER_LOADING:
        return {
            ...state,
            loading:action.payload
        }
        case GET_USERS :
        return {
            ...state,
            users:action.payload
        };
        case GET_USER :
        return {
            ...state,
            loading:false,
            isAuthenticated:!(Object.keys(action.payload.user).length===0),
            user:action.payload.user
        }
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                users:action.payload.users,
                user:{
                    ...state.user,
                    answers:{
                        ...state.user.answers,
                        [action.payload.qid]:action.payload.answer
                    }
                }
            }
        default:
        return state;
    }

}


export default userReducer;