import React from 'react';
import { Route,Redirect  } from 'react-router-dom';
import { isAuthentication } from './helpers/auth';
const AdminRoute = ({component:Component,toggleAdminMenu,setToggleAdminMenu,...rest}) => {
    
    return (
        <Route
            {...rest}
            render={(props)=>
                
                isAuthentication() && isAuthentication().role === 1 ?(
                    <Component {...props} toggleAdminMenu={toggleAdminMenu} setToggleAdminMenu={setToggleAdminMenu} />
                ):(
                    <Redirect to = '/signin' />
                )
            }
        />
    )
}

export default AdminRoute
