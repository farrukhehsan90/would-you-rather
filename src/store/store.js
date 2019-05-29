import { createStore,compose,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware=[thunk];

const store=createStore(rootReducer,{},compose(
    applyMiddleware(...middleware)
));

export default store;