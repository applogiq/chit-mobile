/** **************************** Import Types ****************************** */
import {
    YOURCHITS_REQUEST,
    YOURCHITS_SUCCESS,
    YOURCHITS_FAILURE,
} from '../types/yourchitsTypes';
import { getYourChits } from '../../api/get';








export const yourchitsRequest = () => ({
    type: YOURCHITS_REQUEST,
});
export const yourchitsSuccess = (users) => ({
    type: YOURCHITS_SUCCESS,
    payload: users,
});
export const yourchitsFailure = (error) => ({
    type: YOURCHITS_FAILURE,
    payload: error,
});

export const getYourchits = (params) => async function (dispatch) {
    dispatch(yourchitsRequest())
    return getYourChits(params)
        .then((res) => {
            if (res) {
                dispatch(yourchitsSuccess(res));
                return res;
            }

            dispatch(yourchitsFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}