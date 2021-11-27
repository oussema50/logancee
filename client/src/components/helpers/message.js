import React from 'react'
import Alert from 'react-bootstrap/Alert';
export const  showErrMessage = (msg)=>{
    return(
    <Alert  variant="danger">
        {msg}
    </Alert>)
}
export const  showSuccessMessage = (msg)=>{
    return(
    <Alert  variant="success">
     {msg}
    </Alert>)
}