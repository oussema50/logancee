import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {GET_PRODUCTS} from "../constants/productConstants"
import { GET_NEW_ARRIVAL} from "../constants/filterConstants";
import axios from 'axios';
export const getNewArrivals = (sortBy='desc',limit=3)=> async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.get(`http://localhost:5000/api/filter/?sortBy=${sortBy}&limit=${limit}`);
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_NEW_ARRIVAL,payload:response.data.newArrivals});

    }catch(err){    
        console.log('getNewArrivals api err: ',err);
        
    }
}
export const getProductsByFilter = (arg) => async dispatch=>{
    axios.defaults.withCredentials = true;
    try{
        dispatch({type:START_LOADING});
        const response = await axios.post('http://localhost:5000/api/filter/search',arg);
        dispatch({type:STOP_LOADING});
        dispatch({type:GET_PRODUCTS,payload:response.data.products});
    }
    catch(err){
        console.log('getProductsByFilter api err : ', err);
        dispatch({type:STOP_LOADING});
    }
}
