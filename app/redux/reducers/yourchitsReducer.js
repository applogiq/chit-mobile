/** **************************** Import Types ****************************** */
import {
    YOURCHITS_REQUEST,
    YOURCHITS_SUCCESS,
    YOURCHITS_FAILURE,
} from '../types/yourchitsTypes';

const initialState = {
    loading: false,
    storeyourchitsResponse: [],
    error: '',
};

const yourchitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case YOURCHITS_REQUEST:
            return {
                ...state,
                loading: true,
                storeyourchitsResponse: [],
            };
        case YOURCHITS_SUCCESS:
            return {
                ...state,
                loading: false,
                storeyourchitsResponse: action.payload,
                error: '',
            };
        case YOURCHITS_FAILURE:
            return {
                ...state,
                loading: false,
                storeyourchitsResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default yourchitsReducer;