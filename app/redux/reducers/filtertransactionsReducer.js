/** **************************** Import Types ****************************** */
import {
    FILTER_TRANSACTIONS_SUCCESS,
    FILTER_TRANSACTIONS_REQUEST,
    FILTER_TRANSACTIONS_FAILURE
} from '../types/filtertransactionsTypes';

const initialState = {
    loading: false,
    storefiltertransResponse: [],
    error: '',
};

const filterTransactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                storefiltertransResponse: [],
            };
        case FILTER_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                storefiltertransResponse: action.payload,
                error: '',
            };
        case FILTER_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                storefiltertransResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default filterTransactionsReducer;