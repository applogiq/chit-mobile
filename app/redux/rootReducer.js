/** **************************** Import Libs ****************************** */
import { combineReducers } from 'redux';

/** **************************** Import Reducers ****************************** */
import loginReducer from './reducers/loginReducer';
import logoutReducer from './reducers/logoutReducer';
import metalsReducer from './reducers/metalsReducer';
import yourchitsReducer from './reducers/yourchitsReducer';
import recentTransactionsReducer from './reducers/recenttransactionsReducer';


const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  metals: metalsReducer,
  yourchits: yourchitsReducer,
  recenttransactions: recentTransactionsReducer
});

export default rootReducer;
