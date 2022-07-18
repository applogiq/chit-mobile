/** **************************** Import Types ****************************** */
import {
    RECENTS_REQUEST,
    RECENTS_SUCCESS,
    RECENTS_FAILURE,
} from '../types/recenttransactionsTypes';

const initialState = {
    loading: false,
    storerecentsResponse: [],
    error: '',
};

const recentTransactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECENTS_REQUEST:
            return {
                ...state,
                loading: true,
                storerecentsResponse: [],
            };
        case RECENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                storerecentsResponse: action.payload,
                error: '',
            };
        case RECENTS_FAILURE:
            return {
                ...state,
                loading: false,
                storerecentsResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default recentTransactionsReducer;