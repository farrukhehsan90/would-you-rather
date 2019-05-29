import React, { Component } from 'react';
import {Card,CardHeader, CardContent, Typography, Divider,withStyles, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {saveNewQuestion} from '../../../actions/questionActions';

class NewQuestion extends Component {
    state = {
        firstOption:'',
        secondOption:''
      }

      onChange=e=>{
        this.setState({[e.target.name]:e.target.value});
      }

      onClickSubmit=e=>{
        
        const {user}=this.props.users;
        const {firstOption,secondOption}=this.state;
        const question={
            optionOneText:firstOption,
            optionTwoText:secondOption,
            author:user.id
        };

        this.props.saveNewQuestion(question,this.props.history);
        
      }

    render() {

        const {classes}=this.props;
        const {firstOption,secondOption}=this.state;

        return (
            <Card classes={{
                root:classes.card
            }}>
                <CardHeader
                    title="Create New Question"
                />
                <Divider variant="fullWidth"/>
                <CardContent>
                  
                    <Typography align="left">Complete the question : </Typography>
                    <Typography classes={{
                        root:`${classes.typography} ${classes.wouldYouRatherText}`
                    }} align="left">Would you rather ... </Typography>
                    <TextField
                        onChange={this.onChange}
                        value={firstOption}
                        variant="outlined"
                        name="firstOption"
                        InputProps={{classes:{input:classes.textFieldOption,root:classes.textFieldRootOption}}}
                        placeholder="Enter Option One Text Here"
                    />
                    <Typography classes={{
                        root:classes.typography
                    }} align="center">OR</Typography>
                    <TextField
                        onChange={this.onChange}
                        value={secondOption}
                        variant="outlined"
                        name="secondOption"
                        InputProps={{classes:{input:classes.textFieldOption,root:classes.textFieldRootOption}}}
                        placeholder="Enter Option Two Text Here"
                    />
                    <Button classes={{
                        root:classes.buttonFullWidth
                    }} 
                    fullWidth 
                    style={{backgroundColor:'green'}}
                    onClick={this.onClickSubmit}
                    >
                    Submit
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

const styles={
    typography:{
        fontWeight:'800'
    },
    wouldYouRatherText:{
        paddingTop:'7%'
    },
    textFieldOption:{
        height:'0rem',
        width:'36vw'
    },
    textFieldRootOption:{
        transform:'translate(-2%)'
    },
    buttonFullWidth:{
        marginTop:'3%',
        padding:'2% 4%',
        transform:'translate(-2%)'
    },
    card:{
        textAlign:'center',
        width:'42vw'       
    }
}

const mapStateToProps=state=>({
    users:state.users
});

export default connect(mapStateToProps,{saveNewQuestion})(withStyles(styles)(NewQuestion));