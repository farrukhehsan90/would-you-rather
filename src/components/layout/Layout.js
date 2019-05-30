import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {saveSingleAnswer} from '../../actions/questionActions';
import {logoutUser} from '../../actions/userActions';

class Layout extends Component {
    state = {
        navigationValue: "",
        optionRadio: ""
          
      }

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
  
    onChangePoll = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    onSubmitPoll = questionId => {
      const { user,users } = this.props.users;
      const { questions } = this.props.questions;
      const { optionRadio } = this.state;
      this.props.saveSingleAnswer(user.id, questionId, optionRadio,this.props.history,users,questions,user);
    };

    render() {

        const {navigationValue}=this.state;
        const { users, user } = this.props.users;
        const { question } = this.props.questions;
        const {  optionRadio } = this.state;
        const { classes } = this.props;

        const children=React.Children.map(this.props.children,(child,index)=>{

            return React.cloneElement(child,{
                navigationValue,
                user,
                users,
                question,
                optionRadio,
                classes,
                onChange:this.onChangePoll,
                onSubmitPoll:this.onSubmitPoll,
                onClickLogout:this.onClickLogout

            });

        })

        return (
            <div>
          
          {children}
        </div>
        );
    }
}

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

  const mapStateToProps = state => ({
    users: state.users,
    questions: state.questions
  });
  
  
  
  export default withRouter(connect(mapStateToProps,{ logoutUser, saveSingleAnswer })(withStyles(styles)(Layout)));