import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import {showLoading} from '../helpers/loading'
import { signUp } from '../../api/auth';
import {showErrMessage,showSuccessMessage} from '../helpers/message';
import { isAuthentication } from '../helpers/auth';
const SignUp = () => {
    let [formData,setFormData] = useState({
        name:'',
        userName:'',
        email:'',
        phone:'',
        password:'',
        password2:'',
        successMsg:false,//for the validation of the form
        erroMsg:false,//for any error message
        loading:false
    });  
    //make an instance of useHistory 
    let history = useHistory();
    useEffect(()=>{
        if(isAuthentication() && isAuthentication().role === 1){
            history.push('/admin/dashboard');
        }else if(isAuthentication() && isAuthentication().role === 0){
            history.push('/user/dashboard');
        }
    },[history]);
    //destructure the formData
    let {name,userName,email,phone,password,password2,successMsg,erroMsg,loading}=formData;
    //function handelInput
    const handelInput = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            successMsg:false,
            erroMsg:false
        });
    }
    //function handelSubmit
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        //Client Side Validation
        if(isEmpty(name)||isEmpty(userName)||isEmpty(email)||isEmpty(phone)||isEmpty(password)||isEmpty(password2)){
            setFormData({...formData,erroMsg:'all fields are required'})
        }else if(!isEmail(email)){
            setFormData({...formData,erroMsg:'Invalidate email'})
        }else if(!equals(password,password2)){
            setFormData({...formData,erroMsg:'passwords do not match'})
        }else{
            setFormData({...formData,
                successMsg :'validation success',
                loading:true
            });
            const {name,userName,email,password} = formData;
            const data = {name,userName,email,password,phone}
            signUp(data).then(responce=>{
                setFormData({
                    name:'',
                    userName:'',
                    email:'',
                    phone:'',
                    password:'',
                    password2:'',
                    successMsg:responce.data.successMessage,
                    loading:false
                })
            }).catch(err=>{
                setFormData({...formData,loading:false,erroMsg:err.response.data.errorMessage})
            })
        }
    }
    return (
        <div className="sign-up">  
            {loading && showLoading()}
            {erroMsg && showErrMessage(erroMsg)}  
            {successMsg && showSuccessMessage(successMsg)}
            <h2>don't have an account?register now</h2>
            <p>By creating an account with our store, you will be able to move through the checkout process faster,<br/>
            store multiple shipping addresses, view and track your orders in your account and more</p>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <input type="text" name="name" value={name} onChange={handelInput}  placeholder="Name" />
                    <input type="email" name="email" value={email} onChange={handelInput}  placeholder="Email" />
                </div>
                <div>
                    <input type="text" name="phone" value={phone} onChange={handelInput}  placeholder="phone" />
                    <input type="text" name="userName" value={userName} onChange={handelInput} placeholder="Username" />
                </div>
                <div>
                    <input type="password" autoComplete = "true" name="password" value={password} onChange={handelInput}  placeholder="Password" />
                    <input type="password" autoComplete = "true" name="password2" value={password2} onChange={handelInput}  placeholder="Re-Password" />
                </div>
                <button type="submit">sign Up</button>
            </form>
            <p style={{textAlign:'center'}}> Have an account? <Link to="/signin">sign In</Link> </p>
        </div>
    )
}

export default SignUp
