import { GET_ERRORS } from "../actions/types";

const initialState={
    
    errors:{}
    
};

const questionReducer=(state=initialState,action)=>{

    switch(action.type){
        
        case GET_ERRORS:
        return {
            errors:action.payload
        }

        default:
        return state;
    }

}

export default questionReducer;