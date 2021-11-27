import React from 'react'
import {Route,Redirect} from'react-router-dom';
import { isAuthentication } from './helpers/auth';
const UserRoute = ({component:Component,...rest}) => {
    return (
        <Route 
            {...rest}
            render={(props)=>
                isAuthentication() && isAuthentication().role === 0?(
                    <Component {...props} />
                ):(
                    <Redirect to ='/signin' />
                )
            }
        />
    )
}

export default UserRoute
