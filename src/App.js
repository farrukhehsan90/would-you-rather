import React from 'react';
import {Provider} from 'react-redux';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import store from './store/store';
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";
import Login from './components/auth/login/Login';
import FourZeroFour from './components/common/404';
import withBase from './components/hocs/withBase/withBase';
import PrivateRoute from './components/common/PrivateRoute';

const App =(props)=> {

  
  return (
    <Provider store={store}>
    <Router>
     
    <Route exact  path="/login" component={Login}/>
    <PrivateRoute path="/dashboard" component={Dashboard}/>
    <PrivateRoute exact path="/404" component={FourZeroFour}/>
    </Router>
    </Provider>
  );
}

export default withBase(App);
