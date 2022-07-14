/** **************************** Import Types ****************************** */
import {
    METALS_REQUEST,
    METALS_SUCCESS,
    METALS_FAILURE,
} from '../types/metalsTypes';
import { getMetalsData } from '../../api/get';








export const metalsRequest = () => ({
    type: METALS_REQUEST,
});
export const metalsSuccess = (users) => ({
    type: METALS_SUCCESS,
    payload: users,
});
export const metalsFailure = (error) => ({
    type: METALS_FAILURE,
    payload: error,
});

export const getMetals = (params) => async function (dispatch) {
    dispatch(metalsRequest())
    return getMetalsData(params)
        .then((res) => {
            if (res) {
                dispatch(metalsSuccess(res));
                return res;
            }

            dispatch(metalsFailure(res));
            return res;
        })
        .catch((err) => console.log("Catch Error:", err));
}