import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({pathReroute,users,component:Component,...rest}) => {
    

    const {isAuthenticated}=users;
    return (
        <Route
        {...rest}
        render={(props)=>{
             
                return isAuthenticated?(
                    <Component users={users.users} {...rest} {...props}
                    />
                    ):(
                        <Redirect
                       to={{
                        pathname:'/login',
                        state:{from:props.location.pathname}
                       }}
               
                        />
                        )
            
                    }}
        />
    );
}

const mapStateToProps=state=>({
    users:state.users
})

export default connect(mapStateToProps,{})(PrivateRoute);