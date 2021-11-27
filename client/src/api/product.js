import axios from 'axios';
export const createProduct = async(data) =>{
    axios.defaults.withCredentials = true;
    const response = await axios.post('http://localhost:5000/api/product',data)
    return response
}