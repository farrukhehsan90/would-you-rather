import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import {
  withStyles
} from "@material-ui/core";
import "./Dashboard.css";
import Home from "./home/Home";
import NewQuestion from "./new-question/NewQuestion";
import { logoutUser } from "../../actions/userActions";
import { saveSingleAnswer } from "../../actions/questionActions";
import PollPage from "./home/poll-page/PollPage";
import PrivateRoute from "../common/PrivateRoute";
import Leaderboard from "./leaderboard/Leaderboard";
import AnsweredPollPage from "./home/answered-poll-page/AnsweredPollPage";

class Dashboard extends Component {
  state = {
    navigationValue: "",
    optionRadio: ""
  };

  componentDidMount() {
   }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.questions.question).length > 0) {
      this.setState({ optionRadio: "optionOne" });
    }
  }

  onClickButton = () => {
   };

  onClickLogout = e => {
    const user = {};
    this.props.logoutUser(user, this.props.history);
  };

  onChangePoll = (e, change) => {
   
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitPoll = questionId => {
    const { user,users } = this.props.users;
    const { questions } = this.props.questions;
    const { optionRadio } = this.state;
    this.props.saveSingleAnswer(user.id, questionId, optionRadio,this.props.history,users,questions,user);
  };

  render() {
    const { users, loading, user } = this.props.users;
    const { question } = this.props.questions;
    const {  optionRadio } = this.state;
    const { classes } = this.props;

    let mainContent;

    if (loading || Object.keys(user).length === 0) {
      mainContent = <Spinner />;
    } else {
      mainContent = (
        <div>
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
              onClick={() => this.props.history.push("/dashboard/questions/")}
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
              onClick={() => this.props.history.push("/dashboard/add")}
            >
              New Question
            </div>
            <div
              className="leaderboard"
              style={{ margin: "1% 10% 0 1%", height: "51px" }}
              onClick={() => this.props.history.push("/dashboard/leaderboard")}
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
              onClick={this.onClickLogout}
            >
              Logout
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-container">
        <div style={{ display: "block" }}>{mainContent}</div>
        <div
          style={{
            display: "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
        >
          <PrivateRoute exact path="/dashboard/questions" component={Home} />
          <PrivateRoute
           
            path={`/dashboard/questions/:questionId`}
            optionRadio={optionRadio}
            onSubmitPoll={this.onSubmitPoll}
            onChange={this.onChangePoll}
            user={user}
            users={users}
            question={question}
            classes={classes}
            component={PollPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/add"
            component={NewQuestion}
          />
          <PrivateRoute
            exact
            path="/dashboard/leaderboard"
            classes={classes}
            component={Leaderboard}
          />

          <PrivateRoute
            exact
            path="/dashboard/answered-poll-page/:answerId"
            question={question}
            users={users}
            classes={classes}
            component={AnsweredPollPage}
          />

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  questions: state.questions
});

const styles = {
  pollPageHeader: {
    backgroundColor: "#f2f2f2"
  },
  pollPageHeaderTitle: {
    textAlign: "left"
  },
  pollPageCard: {
    width: "34vw"
  },
  pollPageCardContent: {
    display: "flex",
    flexWrap: "nowrap"
  },
  pollPageCardMedia: {
    width: "5vw",
    height: "10vh"
  },
  pollPageTextContent: {
    borderLeft: "1px solid #f2f2f2",
    margin: "0 2% 0 4%",
    padding: "0 0 0 4%"
  },
  pollPageTextWouldYouRather: {
    whiteSpace: "nowrap",
    fontWeight: "800",
    fontSize: "93%"
  },
  leaderboardUserCard: {
    width: "36vw"
  },
  leaderBoardCardContent: {
    display: "flex",
    flexWrap: "nowrap"
  },
  leaderBoardScore: {
    backgroundColor: "green",
    color: "white",
    fontWeight: "700",
    fontSize: "2rem",
    textAlign:'center',
    verticalAlign:'middle',
    borderRadius: "100px",
    width: "7vw",
    height: "7vh",
    paddingBottom:'2%'
  },
  leaderBoardName:{
    width:'20vw',
    fontSize:'2rem',
    fontWeight:'800'
  },
  leaderBoardImage:{
    width:'5vw',
    height:'10vh',
    paddingRight:'2%'
  },
  answeredPollPageCardContent:{
    display:'flex',
    flexWrap:'nowrap'
  },
  answeredPollPageCardMedia:{
    width:'5vw',
    height:'7vh',
    margin:'2%'
  },
  answeredPollPageOptionOneCard:{
    backgroundColor:'#99ff99',
    border:'1px solid #006600'
  },
  answeredPollPageOptionProgressBar:{
    height:'5vh',
    backgroundColor:'#fff',
    borderRadius:'5px'
  },
  answeredPollPageOptionProgressBarColorPrimary:{
    backgroundColor:'#009933'
  },
  answeredPollPageOptionCardContent:{
    position:'relative'
  },
  answeredPollPageOptionProgressBarText:{
    display:'inline-block',
    position:'absolute',
    top:'26%',
    left:'50%',
    color:'#fff',
    fontSize:'140%'
    
  }
};

export default connect(
  mapStateToProps,
  { logoutUser, saveSingleAnswer }
)(withStyles(styles)(Dashboard));
