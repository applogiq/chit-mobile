/** **************************** Import Types ****************************** */
import {
    LOGOUT_USERS_REQUEST,
    LOGOUT_USERS_SUCCESS,
    LOGOUT_USERS_FAILURE,
} from '../types/logoutTypes';

const initialState = {
    loading: false,
    storeLogoutResponse: [],
    error: '',
};

const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                storeLogoutResponse: [],
            };
        case LOGOUT_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                storeLogoutResponse: action.payload,
                error: '',
            };
        case LOGOUT_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                storeLogoutResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default logoutReducer;
