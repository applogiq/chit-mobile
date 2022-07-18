/** **************************** Import Types ****************************** */
import {
    JOIN_CHIT_REQUEST,
    JOIN_CHIT_SUCCESS,
    JOIN_CHIT_FAILURE,
} from '../types/joinchitTypes';

const initialState = {
    loading: false,
    storeJoinchitResponse: [],
    error: '',
};

const joinchitReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOIN_CHIT_REQUEST:
            return {
                ...state,
                loading: true,
                storeJoinchitResponse: [],
            };
        case JOIN_CHIT_SUCCESS:
            return {
                ...state,
                loading: false,
                storeJoinchitResponse: action.payload,
                error: '',
            };
        case JOIN_CHIT_FAILURE:
            return {
                ...state,
                loading: false,
                storeJoinchitResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default joinchitReducer;