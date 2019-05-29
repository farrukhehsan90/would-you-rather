import {GET_USERS, GET_USER,GET_ERRORS,SET_USER_LOADING} from './types';
import {_getUsers} from '../assets/_DATA';

export const getUsers=()=>dispatch=>{

    return _getUsers()
        .then(users=>{
            return dispatch({
                type:GET_USERS,
                payload:users
            });
        })

};

export const loginUser=(user,users,history)=>dispatch=>{
    
    dispatch(setUserLoading());

    if(Object.keys(users).filter(singleUser=>users[singleUser].id===user).length>0){
      
        const {state}=history.location;
        state===undefined?
        history.push('/dashboard/questions')
        :history.push(state.from);

             return dispatch(
            {
                type:GET_USER,
               payload:{
                   loading:false,
                   isAuthenticated:Object.keys(users).filter(singleUser=>users[singleUser].id===user).length>0,
                   user:users[user]
               }
            });
      

    }
    else{

         dispatch(
            {
                type:GET_ERRORS,
               payload:{
                errors:{
                    doesnotexist:"User does not exist"
                }
            }
            });
        
    }


}

export const logoutUser=(user,history)=>dispatch=>{
    
    history.push('/login');
    
    return dispatch({
        type:GET_USER,
        payload:{
            user
        }
    })
}


export const setUserLoading=()=>{
    return {
        type:SET_USER_LOADING,
        payload:true
    }
};