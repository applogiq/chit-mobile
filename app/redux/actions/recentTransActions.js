/** **************************** Import Types ****************************** */
import {
    RECENTS_REQUEST,
    RECENTS_SUCCESS,
    RECENTS_FAILURE,
} from '../types/recenttransactionsTypes';
import { getRecentTransactions } from '../../api/get';








export const recentsRequest = () => ({
    type: RECENTS_REQUEST,
});
export const recentsSuccess = (users) => ({
    type: RECENTS_SUCCESS,
    payload: users,
});
export const recentsFailure = (error) => ({
    type: RECENTS_FAILURE,
    payload: error,
});

export const getRecenttransactions = (params) => async function (dispatch) {
    dispatch(recentsRequest())
    return getRecentTransactions(params)
        .then((res) => {
            if (res) {
                dispatch(recentsSuccess(res));
                return res;
            }

            dispatch(recentsFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}