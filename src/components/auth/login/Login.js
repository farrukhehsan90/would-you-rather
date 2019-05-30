import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  withStyles,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

import { connect } from "react-redux";
import { getUsers,loginUser } from "../../../actions/userActions";
import { getQuestions } from "../../../actions/questionActions";
import reduxLogo from "../../../assets/img/login-redux-logo.png";

class Login extends Component {
  state = {
    user: "Select User",
    isAuthenticated:false,
    pressedSignIn:false
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getQuestions();
   }

  onClick=()=>{
   }

  onChange =(e,type)=> {

    const {users}=this.props.users;

    this.setState({ [e.target.name]: e.target.value });
   
    switch(type){

      case "select":
      return this.props.loginUser(e.target.value,users,this.props.history);
      default : 
        return;
    }
    
  };
  
  render() {
    const { user } = this.state;
    const { classes } = this.props;
    const { users } = this.props.users;
    
    let usersContent;
        
    if (Object.keys(users).length > 0) {
          usersContent = Object.keys(users).map(user => {
            return (
              <MenuItem key={users[user].id} value={users[user].id}><img alt={users[user].name} style={{marginRight:'1%',marginTop:'1%'}} src={users[user].avatarURL} width="20px"/>{users[user].name}</MenuItem>
              
            );
          });
        }

  

    return (
      <div className="login-container">
      <Card
     
    >
      <CardHeader
        style={{ backgroundColor: "#f2f9f8" }}
        title="Welcome to the Would You Rather app!"
        subheader="Please sign in to continue"
      />

      <CardMedia
        classes={{
          root: classes.reduxLogo,
          media: classes.src
        }}
        component="img"
        src={reduxLogo}
        title="Logo"
      />

      <CardContent>
        <Typography
          style={{ color: "#73f4da" }}
          variant="title"
          gutterBottom
        >
          <strong>Sign In</strong>
        </Typography>

        <FormControl className={classes.formControl}>

        <Select
        style={{width:'25vh'}}
        value={user}
        onChange={(e)=>this.onChange(e,"select")}
        name="user"
        >
        <MenuItem value=""></MenuItem>
        {usersContent}
        </Select>
        </FormControl>
      </CardContent>
    </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  questions:state.questions
});

const styles = {
  src: {
    width: "30%"
  },
  reduxLogo: {
    textAlign: "center",
    margin: "2% auto"
  },
  formControl:{
    
  }
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getUsers,loginUser,getQuestions }
  )(Login)
);
