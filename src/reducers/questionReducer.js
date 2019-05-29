import { GET_QUESTIONS, SAVE_SINGLE_QUESTION,SAVE_NEW_QUESTION, SAVE_QUESTION_ANSWER } from "../actions/types";

const initialState={
    
    loading:false,
    questions:[],
    question:{}
    
};

const questionReducer=(state=initialState,action)=>{

    switch(action.type){
        case GET_QUESTIONS :
        return {
            ...state,
            questions:action.payload
        }
        case SAVE_SINGLE_QUESTION:
            return{
                ...state,
                question:action.payload
            }
        case SAVE_NEW_QUESTION:
            return{
                ...state,
                questions:{
                    ...state.questions,
                    [action.payload.id]:action.payload
                }
            }
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                questions:action.payload.questions,
                question:{
                    ...state.question,
                    [action.payload.answer]:{
                        ...state.question[action.payload.answer],
                        votes:state.question[action.payload.answer].votes.concat(action.payload.authedUser)
                    }
                }
            }
            
        default:
        return state;
    }

}

export default questionReducer;