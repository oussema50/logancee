import { ADD_TO_CART,DELETE_PRODUCT } from "../constants/cartConstants";
import { isAuthentication } from '../../components/helpers/auth';
export const addToCart = product =>  dispatch =>{

    if(isAuthentication()){

        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            :[];
        const duplicates = cart.filter(cartItem => cartItem._id === product._id);
        if(duplicates.length === 0){
            const productToAdd = {
                ...product,
                count : 1
            }
            cart.push(productToAdd);
        }
        
        localStorage.setItem('cart',JSON.stringify(cart))
        
        dispatch({type:ADD_TO_CART,payload:cart});
    }

}
export const deleteProduct = id => dispatch =>{
    const cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    :[];
    const updateCart = cart.filter(cartItem=>cartItem._id !== id);
    localStorage.setItem('cart',JSON.stringify(updateCart));
    dispatch({type:DELETE_PRODUCT,payload:updateCart});
}