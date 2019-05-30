import React from 'react';
import {withRouter} from 'react-router-dom';
import '../dashboard/Dashboard.css';

const Navbar=(props)=> {
    
    const {user,onClickLogout}=props;

    return (
        <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              position: "absolute",
              top: "7%",
              height: "51px",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <div
              className="home"
              style={{ margin: "1% 3% 0 1%", height: "51px" }}
              onClick={() => props.history.push("/")}
            >
              Home
            </div>
            <div
              className="new-question"
              style={{
                margin: "1% 1% 0 1%",
                whiteSpace: "nowrap",
                height: "51px"
              }}
              onClick={() => props.history.push("/add")}
            >
              New Question
            </div>
            <div
              className="leaderboard"
              style={{ margin: "1% 10% 0 1%", height: "51px" }}
              onClick={() => props.history.push("/leaderboard")}
            >
              Leaderboard
            </div>
            <div
              className="account"
              style={{
                display: "flex",
                flexWrap: "nowrap",
                margin: "1% 1% 0 10%",
                height: "51px",

                textAlign: "center"
              }}
            >
              <p
                style={{ margin: "0", whiteSpace: "nowrap" }}
              >{`Hello, ${user.name}`}</p>
              <img alt={user.name} src={user.avatarURL} height="25px" width="25px" />
            </div>
            <div
              className="logout"
              style={{ margin: "1% 1% 0 1%", height: "51px" }}
              onClick={onClickLogout}
            >
              Logout
            </div>
          </div>
    );
}

export default withRouter(Navbar);