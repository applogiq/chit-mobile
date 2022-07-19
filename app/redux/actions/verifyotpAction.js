/** **************************** Import Types ****************************** */
import {
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILURE,
} from '../types/verifyotpTypes';
import { verifyOtp } from '../../api/create';



export const verifyRequest = () => ({
    type: VERIFY_REQUEST,
});
export const verifySuccess = users => ({
    type: VERIFY_SUCCESS,
    payload: users,
});
export const verifyFailure = error => ({
    type: VERIFY_FAILURE,
    payload: error,
});

export const verifyOtpfunc = data =>
    async function (dispatch) {
        dispatch(verifyRequest());
        return verifyOtp(data).then(res => {
            if (res) {



                dispatch(verifySuccess(res));
                return res;
            }
            dispatch(verifyFailure(res));
        });
    };