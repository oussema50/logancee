import {setLocalStorage,getLocalStorage,removeLocalStorage} from '../helpers/localStorage';
import {setCookies,getCookies,removeCookies} from '../helpers/cookies';

export const setAuthentication = (token,user)=>{
    setCookies('token',token);
    setLocalStorage('user',user);
}
export const isAuthentication = ()=>{
    if(getCookies('token') && getLocalStorage('user')){
        return getLocalStorage('user');
    }else{
        return false
    }
}
export const logOut = (next)=>{
    removeLocalStorage('user');
    removeCookies('token');
    next();//is a callback function to redirect to the signin page
}