import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";

const PrivateRoute = ({ users, component: Component, ...rest }) => {
  const { isAuthenticated } = users;



  return (
    <Route
      {...rest}
      render={props => {
      
        return isAuthenticated ? (
          <div>
            <Navbar {...rest} users={users} />
            <div
              style={{
                display: "block",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              {" "}
              <Component users={users.users} {...rest} {...props} />
            </div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
