import React from "react";
import { Provider } from "react-redux";
import {Switch, Route, BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import "./App.css";
import Login from "./components/auth/login/Login";
import FourZeroFour from "./components/common/404";
import withBase from "./components/hocs/withBase/withBase";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./components/dashboard/home/Home";
import NewQuestion from "./components/dashboard/new-question/NewQuestion";
import Leaderboard from "./components/dashboard/leaderboard/Leaderboard";
import PollPage from "./components/dashboard/home/poll-page/PollPage";

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>

        <Route exact path="/login" component={Login} />
        
        <Layout>
          <PrivateRoute kachhu="kachhu" exact path="/" component={Home} />
          <PrivateRoute
            path={`/questions/:questionId`}
            component={PollPage}
            />
          <PrivateRoute exact path="/add" component={NewQuestion} />
          <PrivateRoute
            exact
            path="/leaderboard"
            component={Leaderboard}
            />
        </Layout>

        <PrivateRoute exact path="/404" component={FourZeroFour} />
       
        <Route path="*" component={()=><h1>Oops! No such page</h1>} />
       
</Switch>
      </Router>
    </Provider>
  );
};

export default withBase(App);
