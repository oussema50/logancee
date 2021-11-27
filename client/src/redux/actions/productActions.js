import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {SHOW_SUCCESS_MESSAGE, SHOW_ERRORE_MESSAGE} from '../constants/messageConstants';
import { GET_PRODUCTS,CREATE_PRODUCT,DELETE_PRODUCT,GET_PRODUCT} from "../constants/productConstants";
import axios from 'axios';
export const createProduct = (formData)=> async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.post('http://localhost:5000/api/product',formData);
        dispatch({type:STOP_LOADING});
        dispatch({type:CREATE_PRODUCT,payload:response.data.product});
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:response.data.succesMessage})
    }catch(err){
        console.log('create product api err : ' , err);
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERRORE_MESSAGE,payload:err.response.data.errorMessage})
    }

    
}
export const getProducts = () => async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.get('http://localhost:5000/api/product');
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_PRODUCTS,payload:response.data.allProducts});
    }
    catch(err){
        console.log('getProducts api err : ', err);
        dispatch({type:STOP_LOADING});
    }
}
export const getProductsByCount = () => async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.get('http://localhost:5000/api/product/count');
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_PRODUCTS,payload:response.data.ProductsByCount});
    }
    catch(err){
        console.log('getProducts api err : ', err);
        dispatch({type:STOP_LOADING});
    }
}
export const deleteProduct = (productId)=> async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.delete(`http://localhost:5000/api/product/${productId}`);
        dispatch({type:STOP_LOADING});
        dispatch({type:DELETE_PRODUCT,payload:response.data.productDelete})
        
    }catch(err){
        console.log('deleteProduct api err : ', err);
        dispatch({type:STOP_LOADING});
    }
}
export const getProduct = (productId) => async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_PRODUCT,payload:response.data.product});
    }
    catch(err){
        console.log('getProduct api err : ', err);
        dispatch({type:STOP_LOADING});
    }
}