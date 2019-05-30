import React,{Component} from 'react';
import { connect} from 'react-redux';
import {saveSingleQuestion} from '../../../../actions/questionActions';
import { Card, CardHeader,LinearProgress, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

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
    const {users,user}=this.props.users;
    const {question}=this.props.questions;
    const {showPollPage}=this.props.showPoll;

    let pollPageContent;
    let answeredPollContent;

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
  
    {showPollPage?pollPageContent:answeredPollContent}
    </div>;
}
}

const mapStateToProps=state=>({
    users:state.users,
    questions:state.questions,
    showPoll:state.showPollPage
})


export default connect(mapStateToProps,{saveSingleQuestion})(PollPage);