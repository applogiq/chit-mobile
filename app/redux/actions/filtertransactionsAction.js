/** **************************** Import Types ****************************** */
import {
    FILTER_TRANSACTIONS_SUCCESS,
    FILTER_TRANSACTIONS_FAILURE,

    FILTER_TRANSACTIONS_REQUEST
} from '../types/filtertransactionsTypes';
import { getFilterTransactions } from '../../api/get';








export const filtertransRequest = () => ({
    type: FILTER_TRANSACTIONS_REQUEST,
});
export const filtertransSuccess = (users) => ({
    type: FILTER_TRANSACTIONS_SUCCESS,
    payload: users,
});
export const filtertransFailure = (error) => ({
    type: FILTER_TRANSACTIONS_FAILURE,
    payload: error,
});

export const getFiltertransactions = (userparams, startdate, enddate) => async function (dispatch) {
    dispatch(filtertransRequest())
    return getFilterTransactions(userparams, startdate, enddate)
        .then((res) => {
            if (res) {
                dispatch(filtertransSuccess(res));
                return res;
            }

            dispatch(filtertransFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}