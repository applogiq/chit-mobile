/** **************************** Import Types ****************************** */
import {
    METALS_REQUEST,
    METALS_SUCCESS,
    METALS_FAILURE,
} from '../types/metalsTypes';

const initialState = {
    loading: false,
    storemetalsResponse: [],
    error: '',
};

const metalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case METALS_REQUEST:
            return {
                ...state,
                loading: true,
                storemetalsResponse: [],
            };
        case METALS_SUCCESS:
            return {
                ...state,
                loading: false,
                storemetalsResponse: action.payload,
                error: '',
            };
        case METALS_FAILURE:
            return {
                ...state,
                loading: false,
                storemetalsResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default metalsReducer;
