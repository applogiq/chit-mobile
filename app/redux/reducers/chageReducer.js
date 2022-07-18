/** **************************** Import Types ****************************** */
import {
    CHANGE_REQUEST,
    CHANGE_SUCCESS,
    CHANGE_FAILURE,
} from '../types/changeTypes';

const initialState = {
    loading: false,
    storeChangeResponse: [],
    error: '',
};

const changePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_REQUEST:
            return {
                ...state,
                loading: true,
                storeChangeResponse: [],
            };
        case CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                storeChangeResponse: action.payload,
                error: '',
            };
        case CHANGE_FAILURE:
            return {
                ...state,
                loading: false,
                storeChangeResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default changePasswordReducer;