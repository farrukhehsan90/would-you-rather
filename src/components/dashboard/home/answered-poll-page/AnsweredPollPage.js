import React, { Component } from 'react';
import { CardMedia, CardContent, Card, Typography, CardHeader, LinearProgress } from '@material-ui/core';
import {connect} from 'react-redux';
import {saveSingleQuestion} from '../../../../actions/questionActions';

class AnsweredPollPage extends Component{

state={}

componentDidMount(){

    const {answerId}=this.props.match.params;
    const {user}=this.props.users;
    const {questions}=this.props.questions;
    if(answerId){
        
        if(Object.keys(user.answers).indexOf(answerId)===-1){
        this.props.history.push('/404');
        return;
        }

        this.props.saveSingleQuestion(questions[answerId]);
        
    }
  
}

render(){

    const {classes} = this.props;

    const {users,user}=this.props.users;
    const {question}=this.props.questions;

    let answeredPollContent;

    if(Object.keys(users).length>0 && Object.keys(question).length>0){
       
      
        answeredPollContent=
            <Card>
                <CardHeader
                    subheader={`Asked by ${users[question.author].name} :`}
                />
            <CardContent classes={{
                root:classes.answeredPollPageCardContent
            }}>
                <CardMedia
                classes={{
                    media:classes.answeredPollPageCardMedia
                }}
                component="img"
                src={users[question.author].avatarURL}
                />
                <Typography component="div">
                    <Card classes={{
                        root:classes.answeredPollPageOptionOneCard
                    }}>
                        <CardHeader
                            subheader={`Would you rather ${question.optionOne.text}?`}
                        />
                        <CardContent classes={{
                            root:classes.answeredPollPageOptionCardContent
                        }}>
                            <Typography>{question.optionOne.votes.includes(user.id)?(<strong>Your vote</strong>):''}</Typography>
                        <LinearProgress 
                        variant="determinate" 
                        classes={{
                            barColorPrimary:classes.answeredPollPageOptionProgressBarColorPrimary,
                            determinate:classes.answeredPollPageOptionProgressBar
                        }}
                        color="primary"
                        value={(question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100}/>
                        <span style={{
                            display:'inline-block',
                            position:'absolute',
                            top:question.optionOne.votes.includes(user.id)?'35%':'23%',
                            left:Math.round(Math.floor((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))===0?
                            '10%'
                            :
                            `${Math.round(Math.floor((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))-10}%`,
                            color:Math.round(Math.floor((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))===0?'#000':'#fff',
                            fontSize:'140%'
                        }}>{`${Math.round(Math.floor((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))}%`}</span>
                        <Typography>{`${question.optionOne.votes.length} out of ${(question.optionOne.votes.length+question.optionTwo.votes.length)} votes`}</Typography>
                    </CardContent>
                    </Card>
                        <br/>
                    <Card classes={{
                        root:classes.answeredPollPageOptionOneCard
                    }}>
                        <CardHeader
                            subheader={`Would you rather ${question.optionTwo.text}?`}
                        />
                        <CardContent classes={{
                            root:classes.answeredPollPageOptionCardContent
                        }}>
                            <Typography >{question.optionTwo.votes.includes(user.id)?(<strong>Your vote</strong>):''}</Typography>
                        <LinearProgress 
                        variant="determinate" 
                        classes={{
                            barColorPrimary:classes.answeredPollPageOptionProgressBarColorPrimary,
                            determinate:classes.answeredPollPageOptionProgressBar
                        }}
                        color="primary"
                        value={(question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100}/>
                        <span style={{
                            display:'inline-block',
                            position:'absolute',
                            top:question.optionTwo.votes.includes(user.id)?'35%':'23%',
                            left:Math.round(Math.floor((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))===0?
                            '10%'
                            :
                            `${Math.round(Math.floor((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))-10}%`,
                            color:Math.round(Math.floor((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))===0?'#000':'#fff',
                            fontSize:'140%'
                        }}>{`${Math.round(Math.floor((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100))}%`}</span>
                        <Typography>{`${question.optionTwo.votes.length} out of ${(question.optionOne.votes.length+question.optionTwo.votes.length)} votes`}</Typography>
                    </CardContent>
                    </Card>
                </Typography>
            </CardContent>
        </Card>
        
    }

    return <div>
    {answeredPollContent}</div>;
}

}

const mapStateToProps=state=>({
    users:state.users,
    questions:state.questions
})

export default connect(mapStateToProps,{saveSingleQuestion})(AnsweredPollPage);