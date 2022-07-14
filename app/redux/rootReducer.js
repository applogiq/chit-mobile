/** **************************** Import Libs ****************************** */
import { combineReducers } from 'redux';

/** **************************** Import Reducers ****************************** */
import loginReducer from './reducers/loginReducer';
import logoutReducer from './reducers/logoutReducer';
import metalsReducer from './reducers/metalsReducer';


const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  metals: metalsReducer
});

export default rootReducer;
