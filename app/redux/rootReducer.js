/** **************************** Import Libs ****************************** */
import { combineReducers } from "redux";

/** **************************** Import Reducers ****************************** */
import loginReducer from "./reducers/loginReducer";



const rootReducer = combineReducers({
  login: loginReducer,


});

export default rootReducer;