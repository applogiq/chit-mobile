/** **************************** Import Types ****************************** */
import {
    POST_PROFILE_REQUEST,
    POST_PROFILE_SUCCESS,
    POST_PROFILE_FAILURE,
} from '../types/postprofileTypes';

const initialState = {
    loading: false,
    storePostprofileResponse: [],
    error: '',
};

const postprofileReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                storePostprofileResponse: [],
            };
        case POST_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                storePostprofileResponse: action.payload,
                error: '',
            };
        case POST_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                storePostprofileResponse: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default postprofileReducer;