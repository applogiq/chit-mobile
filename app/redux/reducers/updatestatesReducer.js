/** **************************** Import Types ****************************** */
import {
  UPDATE_STATES_SUCCESS,
  UPDATE_STATES_FAILURE,
  UPDATE_STATES_REQUEST,
} from '../types/updatestatesTypes';

const initialState = {
  loading: false,
  states: false,
  error: '',
};

const updatestatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATES_REQUEST:
      return {
        ...state,
        loading: true,
        states: false,
      };
    case UPDATE_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        states: action.payload,
        error: '',
      };
    case UPDATE_STATES_FAILURE:
      return {
        ...state,
        loading: false,
        states: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updatestatesReducer;
