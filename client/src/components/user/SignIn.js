import React,{useState,useEffect} from 'react';
import { Link,useHistory  } from 'react-router-dom';
import { showLoading } from '../helpers/loading';
import { showErrMessage } from '../helpers/message';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signIn } from '../../api/auth';
import { setAuthentication,isAuthentication } from '../helpers/auth';
const SignIn = () => {
    let [formData,setFormData] = useState({
        email:'omranioussema3@gmail.com',
        password:'azertyui',
        erroMsg:false,//for any error message
        loading:false,
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
    let {email,password,erroMsg,loading}=formData;
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
        if(isEmpty(email)||isEmpty(password)){
            setFormData({...formData,erroMsg:'all fields are required'});
        }else if(!isEmail(email)){
            setFormData({...formData,erroMsg:'invalid credentials'});
        }else{
            setFormData({...formData,
                loading:true
            });
            const {email,password} = formData;
            const data = {email,password} 
            signIn(data)
            .then(response=>{
                const {token,user} = response.data
                setAuthentication(token,user);
                if(isAuthentication() && isAuthentication().role === 1 ){
     
                    history.push('/admin/dashboard');
                }else{
                    
                    history.push('/');
                }
            })
            .catch(err=>{
                console.log(err)
                setFormData({...formData,erroMsg:err.response.data.errorMessage,loading:false})
            })
        }
    }
    return (
        <div className="sign-in">  
            {loading && showLoading()}
            {erroMsg && showErrMessage(erroMsg)}
            <h2>log in your account</h2>
            <p> log in to your account to discovery all great features in this template. </p>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <input type="email" name="email" value={email} onChange={handelInput}  placeholder="Email" />
                </div>

                <div>
                    <input type="password" autoComplete = "true" name="password" value={password} onChange={handelInput}  placeholder="Password" />
                </div>
                <button type="submit">sign In</button>
            </form>
            <p>don't have an account? <Link to="/signup">Register here</Link> </p>
        </div>
    )
}

export default SignIn
