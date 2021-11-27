import { composeWithDevTools } from "redux-devtools-extension";
import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loadingReducers from "./reducers/loadingReducers";
import messageReducers from "./reducers/messageReducers";
import categoryReducers from "./reducers/categoryReducers";
import productReducers  from "./reducers/productReducers";
import filterReducers  from "./reducers/filterReducers";
import cartReducers from "./reducers/cartReducers"
const reducer = combineReducers({
    loading:loadingReducers,
    messages:messageReducers,
    categories:categoryReducers,
    products:productReducers,
    filters:filterReducers,
    cart:cartReducers
});

const initialState = {}
const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
export default store;