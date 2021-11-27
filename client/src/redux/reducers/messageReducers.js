import {SHOW_SUCCESS_MESSAGE, SHOW_ERRORE_MESSAGE,CLEAR_MESSAGE} from '../constants/messageConstants'
const INITIAL_STATE = {
    succesMsg:'',
    errMsg:''
}
const messageReducers = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case SHOW_SUCCESS_MESSAGE:
            return{
                ...state,
                succesMsg:action.payload 
            };
        case SHOW_ERRORE_MESSAGE:
            return {
                ...state,
                errMsg:action.payload
            }
        case CLEAR_MESSAGE:
            return{
                ...state,
                succesMsg:'',
                errMsg:''
            }
        default:return state
    }
}
export default messageReducers