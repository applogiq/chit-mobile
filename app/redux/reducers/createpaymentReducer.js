/** **************************** Import Types ****************************** */
import {
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_FAILURE,
} from '../types/createpaymentTypes';

const initialState = {
  loading: false,
  storeCreateResponse: [],
  error: '',
};

const createpaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        storeCreateResponse: [],
      };
    case POST_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        storeCreateResponse: action.payload,
        error: '',
      };
    case POST_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        storeCreateResponse: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createpaymentReducer;
