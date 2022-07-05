/** **************************** Import Libs ****************************** */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

/** **************************** Import Root Reducer ****************************** */
import {env} from '../config';
import rootReducer from './rootReducer';

let middleware = [];
if (env === 0) {
  middleware = [...middleware, thunk];
} else {
  middleware = [...middleware, thunk];
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
