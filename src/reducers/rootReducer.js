import userReducer from './userReducer';
import questionReducer from './questionReducer';
import errorReducer from './errorReducer';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
    questions: questionReducer,
    users:userReducer,
    errors:errorReducer
});

export default rootReducer;