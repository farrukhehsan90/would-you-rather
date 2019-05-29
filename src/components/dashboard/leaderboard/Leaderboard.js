import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';

class Leaderboard extends Component {
    state = {  }
    render() {

        const {users}=this.props.users;
        const {classes}=this.props;
        
        let leaderboardContent;
        if(Object.keys(users).length>0){

            const usersClone=Object.keys(users).sort((a,b)=>{
                return (Object.keys(users[b].answers).length+users[b].questions.length)-(Object.keys(users[a].answers).length+users[a].questions.length);
            });
            leaderboardContent=usersClone.map(user=>{
                
                
                return (<Card key={user} classes={{
                    root:classes.leaderboardUserCard
                }}>
                   <CardContent classes={{
                       root:classes.leaderBoardCardContent
                   }}>
                       <CardMedia 
                        classes={{
                            media:classes.leaderBoardImage
                        }}
                        component="img"
                        src={users[user].avatarURL}
                       />
                       <Typography align="left">
                           
                            <Typography classes={{
                                root:classes.leaderBoardName
                            }}>
                            {users[user].name}
                            </Typography>
                            <Typography>
                                Answered Questions : {Object.keys(users[user].answers).length}
                            </Typography>
                            <Typography>
                                Created Questions : {users[user].questions.length}
                            </Typography>
                       </Typography>

                       <Typography classes={{
                           root:classes.leaderBoardScore
                       }}>
                           {Object.keys(users[user].answers).length + users[user].questions.length}
                       </Typography>
                   </CardContent>
                </Card>)
            })
        }

        return (
            <div style={{}}>{leaderboardContent}</div>
        );
    }
}

const mapStateToProps=state=>({
    users:state.users
});

export default connect(mapStateToProps,{})(Leaderboard);