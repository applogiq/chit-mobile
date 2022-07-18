/** **************************** Import Types ****************************** */
import {
    SCHEME_TRANSACTIONS_SUCCESS,
    SCHEME_TRANSACTIONS_REQUEST,
    SCHEME_TRANSACTIONS_FAILURE
} from '../types/schemetransactionsTypes';

const initialState = {
    loading: false,
    storeschemetransResponse: [],
    error: '',
};

const schemeTransactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCHEME_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                storeschemetransResponse: [],
            };
        case SCHEME_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                storeschemetransResponse: action.payload,
                error: '',
            };
        case SCHEME_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                storeschemetransResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default schemeTransactionsReducer;