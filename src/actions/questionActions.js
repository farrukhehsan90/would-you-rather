import {GET_QUESTIONS,SAVE_SINGLE_QUESTION,SAVE_QUESTION_ANSWER,SAVE_NEW_QUESTION} from './types';
import {_getQuestions,_saveQuestionAnswer, _saveQuestion} from '../assets/_DATA';

export const getQuestions=()=>dispatch=>{
    _getQuestions()
        .then(questions=>{
            return dispatch({
                type:GET_QUESTIONS,
                payload:questions
            })
        });
}

export const saveSingleQuestion=(question)=>dispatch=>{

    return dispatch({
        type:SAVE_SINGLE_QUESTION,
        payload:question
    })

}

export const saveSingleAnswer=(authedUser,qid,answer,history,users,questions,user)=>dispatch=>{
    const singleAnswer={
        authedUser,
        qid,
        answer
    };

    
    
    _saveQuestionAnswer(singleAnswer)
        .then(res=>{
           const newUsers = {
                ...users,
                [authedUser]: {
                  ...users[authedUser],
                  answers: {
                    ...users[authedUser].answers,
                    [qid]: answer
                  }
                }
              };
          
             const newQuestions = {
                ...questions,
                [qid]: {
                  ...questions[qid],
                  [answer]: {
                    ...questions[qid][answer],
                    votes: questions[qid][answer].votes.concat([authedUser])
                  }
                }
              };

       
            return dispatch({
                type:SAVE_QUESTION_ANSWER,
                payload:{
                    users:newUsers,
                    questions:newQuestions,
                    qid,
                    authedUser,
                    answer
                }
            })
        })
        .then(answer=>history.push(`/dashboard/answered-poll-page/${qid}`));
}

export const saveNewQuestion=(question,history)=>dispatch=>{
    _saveQuestion(question)
        .then(question=>{
            return dispatch({
                type:SAVE_NEW_QUESTION,
                payload:question
            })
        })
        .then(res=>history.push('/dashboard/questions'))
}