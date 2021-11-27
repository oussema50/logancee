import {GET_NEW_ARRIVAL} from '../constants/filterConstants';
const INITIAL_STATE = {
    newArrivals:[]
}
const filterReducers = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case GET_NEW_ARRIVAL:
            return {
                newArrivals:[...action.payload]
            }

        default:
            return state;
    }
}
export default filterReducers;