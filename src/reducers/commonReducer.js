import { SHOW_POLL_PAGE } from "../actions/types";

const initialState={
    
    showPollPage:true
    
};

const questionReducer=(state=initialState,action)=>{

    switch(action.type){
        
        case SHOW_POLL_PAGE:
        return {
            showPollPage:action.payload
        }

        default:
        return state;
    }

}

export default questionReducer;