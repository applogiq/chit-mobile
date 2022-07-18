/** **************************** Import Types ****************************** */
import {
    CHANGE_REQUEST,
    CHANGE_SUCCESS,
    CHANGE_FAILURE,
} from '../types/changeTypes';
import { changePassword } from '../../api/create';



export const ChangeRequest = () => ({
    type: CHANGE_REQUEST,
});
export const ChangeSuccess = users => ({
    type: CHANGE_SUCCESS,
    payload: users,
});
export const ChangeFailure = error => ({
    type: CHANGE_FAILURE,
    payload: error,
});

export const changePasswordfunc = data =>
    async function (dispatch) {
        dispatch(ChangeRequest());
        return changePassword(data).then(res => {
            if (res) {



                dispatch(ChangeSuccess(res));
                return res;
            }
            dispatch(ChangeFailure(res));
        });
    };