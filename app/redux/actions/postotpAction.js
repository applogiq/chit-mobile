/** **************************** Import Types ****************************** */
import {
    POST_OTP_REQUEST,
    POST_OTP_SUCCESS,
    POST_OTP_FAILURE,
} from '../types/postotpTypes';
import { postOtp } from '../../api/create';



export const postotpRequest = () => ({
    type: POST_OTP_REQUEST,
});
export const postotpSuccess = users => ({
    type: POST_OTP_SUCCESS,
    payload: users,
});
export const postotpFailure = error => ({
    type: POST_OTP_FAILURE,
    payload: error,
});

export const PostOtp = data =>
    async function (dispatch) {
        dispatch(postotpRequest());
        return postOtp(data).then(res => {
            if (res) {


                dispatch(postotpSuccess(res));
                return res;
            }
            dispatch(postotpFailure(res));
        });
    };
