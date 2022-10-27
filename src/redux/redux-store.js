import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth-reducer";
import listReducer from "./list-reducer";



let reducers = combineReducers({
    form: formReducer,
    auth :authReducer,
    list: listReducer,

});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));



window.__store__ = store;

export default store;

