import { SHOW_POLL_PAGE } from "./types";

export const setToAnsweredPollPage=(answer,history)=>dispatch=>{
    
    setTimeout(() => {
        history.push(`/questions/${answer}`);
    }, 3000);
    
    return dispatch({
        type:SHOW_POLL_PAGE,
        payload:false
    })
}
export const setToPollPage=(question,history)=>dispatch=>{
    
    setTimeout(() => {
        history.push(`/questions/${question}`);
    }, 3000);
    
    return dispatch({
        type:SHOW_POLL_PAGE,
        payload:true
    })
}