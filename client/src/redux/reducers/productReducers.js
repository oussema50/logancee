import {GET_PRODUCTS,CREATE_PRODUCT,GET_PRODUCT, DELETE_PRODUCT} from '../constants/productConstants';
const INITIAL_STATE = {
    products:[]
}
const productReducers = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case CREATE_PRODUCT:
            return {
                ...state,
                products:[...state.products,action.payload]
            }
        case GET_PRODUCTS:
            return {
                products:[...action.payload]
            };
        case DELETE_PRODUCT:
            return{
                ...state,
                products:state.products.filter(item => item._id !== action.payload._id),
            }
        case GET_PRODUCT:
            return {product:action.payload}
        default:
            return state;
    }
}
export default productReducers;