import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {SHOW_SUCCESS_MESSAGE, SHOW_ERRORE_MESSAGE} from '../constants/messageConstants';
import { GET_CATEGORY,CREATE_CATEGORY } from "../constants/categoryConstants";
import axios from 'axios';
export const getCategories = ()=> async dispatch=>{ 
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING})
        const response = await axios.get('http://localhost:5000/api/category');
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_CATEGORY,payload:response.data.categories});
    }catch(err){
        console.log('err api category message: ' + err);
        dispatch({type:STOP_LOADING});
        
    }
    
}
export const createCategory = (formData)=> async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        const config = { 
            headers:{
                'Content-Type':'application/json'
            }
        }
        dispatch({type:START_LOADING});
        const response = await axios.post('http://localhost:5000/api/category',formData,config);
        dispatch({type:STOP_LOADING});
        dispatch({type:CREATE_CATEGORY,payload:response.data.category})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:response.data.succesMessage})
        
    }catch(err){
        console.log('err api create category :',err)
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERRORE_MESSAGE,payload:err.response.data.errorMessage});
    }
    
}
