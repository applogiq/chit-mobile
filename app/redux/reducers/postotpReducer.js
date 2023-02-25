/** **************************** Import Types ****************************** */
import {
  POST_OTP_REQUEST,
  POST_OTP_SUCCESS,
  POST_OTP_FAILURE,
} from '../types/postotpTypes';

const initialState = {
  loading: false,
  storePostotpResponse: [],
  error: '',
};

const postotpReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        storePostotpResponse: [],
      };
    case POST_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        storePostotpResponse: action.payload,
        error: '',
      };
    case POST_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        storePostotpResponse: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postotpReducer;
