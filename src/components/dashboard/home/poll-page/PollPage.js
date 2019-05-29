import React,{Component} from 'react';
import { connect} from 'react-redux';
import {saveSingleQuestion} from '../../../../actions/questionActions';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

class PollPage extends Component{

    componentDidMount(){
        const {questionId}=this.props.match.params;
        const {questions}=this.props.questions;
        if(questionId){
            
            if(Object.keys(questions).indexOf(questionId)===-1){
            this.props.history.push('/404');
            return;
            }

            this.props.saveSingleQuestion(questions[questionId]);
            
        }
        
        }
    

    render(){
    const {classes,optionRadio,onChange,onSubmitPoll}=this.props;
    const {users}=this.props.users;
    const {question}=this.props.questions;


    let pollPageContent;

    if(Object.keys(users).length>0 && Object.keys(question).length>0){
    
        pollPageContent=<Card classes={{
            root:classes.pollPageCard
        }}>
            <CardHeader classes={{
                root:classes.pollPageHeader,
                title:classes.pollPageHeaderTitle
            }} title={`${question.author} asks:`} />
            <CardContent classes={{
                root:classes.pollPageCardContent
            }}>
            <CardMedia component="img" classes={{
                media:classes.pollPageCardMedia
            }} src={users[question.author].avatarURL}/>

            <Typography component="div" classes={{
                root:classes.pollPageTextContent
            }}>
                <Typography align="left" classes={{
                    root:classes.pollPageTextWouldYouRather
                }}>Would you rather...</Typography>

                <Typography align="left">
                <label>
                <input 
                type="radio"
                
                value="optionOne"
                onChange={onChange}
                name="optionRadio"
                checked={optionRadio==='optionOne'}
                />
                {question.optionOne.text}
                </label>
                    </Typography>
                <Typography align="left">
                <label>
                <input 
                type="radio"
                value="optionTwo"
                onChange={onChange}
                checked={optionRadio==="optionTwo"}
                name="optionRadio"
                
                />
                {question.optionTwo.text}
                </label>
                
                </Typography>

                <Button onClick={()=>{onSubmitPoll(question.id)}} style={{backgroundColor:'green',color:'white',marginTop:'2%'}} fullWidth variant="contained">Submit</Button>
            
            </Typography>

            </CardContent>
        </Card>  
    }

    return <div>
  
    {pollPageContent}
    </div>;
}
}

const mapStateToProps=state=>({
    users:state.users,
    questions:state.questions
})


export default connect(mapStateToProps,{saveSingleQuestion})(PollPage);