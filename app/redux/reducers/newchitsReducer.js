/** **************************** Import Types ****************************** */
import {
  NEWCHITS_REQUEST,
  NEWCHITS_SUCCESS,
  NEWCHITS_FAILURE,
} from '../types/newchitsTypes';

const initialState = {
  loading: false,
  storenewchitsResponse: [],
  error: '',
};

const newchitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWCHITS_REQUEST:
      return {
        ...state,
        loading: true,
        storenewchitsResponse: [],
      };
    case NEWCHITS_SUCCESS:
      return {
        ...state,
        loading: false,
        storenewchitsResponse: action.payload,
        error: '',
      };
    case NEWCHITS_FAILURE:
      return {
        ...state,
        loading: false,
        storenewchitsResponse: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newchitsReducer;
