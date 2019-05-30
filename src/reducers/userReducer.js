import { GET_USERS, GET_USER,SET_USER_LOADING, SAVE_QUESTION_ANSWER, SAVE_NEW_QUESTION } from "../actions/types";

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

        case SAVE_NEW_QUESTION:
            return {
                ...state,
                users:{
                    ...state.users,
                    [action.payload.author] : {
                        ...state.users[action.payload.author],
                        questions: state.users[action.payload.author].questions.concat(action.payload.id)
                    }
                },
                user:{
                    ...state.user,
                    questions:state.user.questions.concat(action.payload.id)
                }
            } 
        default:
        return state;
    }

}


export default userReducer;