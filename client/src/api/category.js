import axios from 'axios'

export const createCategory = async formdata => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    axios.defaults.withCredentials = true;
    const response = await axios.post('http://localhost:5000/api/category',formdata,config);
    
    return response;
}
// export const getCategory = async()=>{
//     axios.defaults.withCredentials = true;
//     const response = await axios.get('http://localhost:5000/api/category');
//     return response;
// }