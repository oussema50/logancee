import cookies from 'js-cookie';

export const setCookies = (key,value) =>{
    cookies.set(key,value,{expires:1});
}

export const getCookies = (key) =>cookies.get(key);

export const removeCookies = key=>cookies.remove(key)