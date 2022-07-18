/** **************************** Import Libs ****************************** */
import { combineReducers } from 'redux';

/** **************************** Import Reducers ****************************** */
import loginReducer from './reducers/loginReducer';
import logoutReducer from './reducers/logoutReducer';
import metalsReducer from './reducers/metalsReducer';
import yourchitsReducer from './reducers/yourchitsReducer';
import recentTransactionsReducer from './reducers/recenttransactionsReducer';
import schemeTransactionsReducer from './reducers/schemetransactionsReducer';
import newchitsReducer from './reducers/newchitsReducer';
import joinchitReducer from './reducers/joinchitReducer';
import postotpReducer from './reducers/postotpReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  metals: metalsReducer,
  yourchits: yourchitsReducer,
  recenttransactions: recentTransactionsReducer,
  schemetransactions: schemeTransactionsReducer,
  newchits: newchitsReducer,
  joinchit: joinchitReducer,
  postotp: postotpReducer
});

export default rootReducer;
