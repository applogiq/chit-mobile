/** **************************** Import Types ****************************** */
import {
    POST_PAYMENT_FAILURE, POST_PAYMENT_REQUEST, POST_PAYMENT_SUCCESS
} from '../types/createpaymentTypes';
import { createPayment, verifyPayment } from '../../api/create';








export const createRequest = () => ({
    type: POST_PAYMENT_REQUEST,
});
export const createSuccess = (users) => ({
    type: POST_PAYMENT_SUCCESS,
    payload: users,
});
export const createFailure = (error) => ({
    type: POST_PAYMENT_FAILURE,
    payload: error,
});

export const CreatePayment = (params) => async function (dispatch) {
    dispatch(createRequest())
    return createPayment(params)
        .then((res) => {
            if (res) {
                dispatch(createSuccess(res));
                return res;
            }

            dispatch(createFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}

export const VerifyPayment = (params) => async function (dispatch) {
    dispatch(createRequest())
    return verifyPayment(params)
        .then((res) => {
            if (res) {
                dispatch(createSuccess(res));
                return res;
            }

            dispatch(createFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}