import userReducer from './userReducer';
import questionReducer from './questionReducer';
import errorReducer from './errorReducer';
import commonReducer from './commonReducer';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
    questions: questionReducer,
    users:userReducer,
    errors:errorReducer,
    showPollPage:commonReducer
});

export default rootReducer;