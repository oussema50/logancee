import axios from 'axios'
export const signUp = async data=>{
    const config = {
        headers:{
            'content-type':'application/json'
        }
    }
    //wait until the data send to the server
    const response = await axios.post('http://localhost:5000/api/auth/signup',data,config);//endpoint 
    return response;
}
export const signIn = async data=>{
    const config = {
        headers:{
            'content-type':'application/json'
        }
    }
    const response = await axios.post('http://localhost:5000/api/auth/signin',data,config);
    return response;
}