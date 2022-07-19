/** **************************** Import Types ****************************** */
import {
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILURE,
} from '../types/verifyotpTypes';

const initialState = {
    loading: false,
    storeVerifyResponse: [],
    error: '',
};

const verifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_REQUEST:
            return {
                ...state,
                loading: true,
                storeVerifyResponse: [],
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                storeVerifyResponse: action.payload,
                error: '',
            };
        case VERIFY_FAILURE:
            return {
                ...state,
                loading: false,
                storeVerifyResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default verifyReducer;