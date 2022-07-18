/** **************************** Import Types ****************************** */
import {
    LOGOUT_USERS_REQUEST,
    LOGOUT_USERS_SUCCESS,
    LOGOUT_USERS_FAILURE,
} from '../types/logoutTypes';
import { postLogoutRequestData } from '../../api/create';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const LogoutUsersRequest = () => ({
    type: LOGOUT_USERS_REQUEST,
});
export const LogoutUsersSuccess = users => ({
    type: LOGOUT_USERS_SUCCESS,
    payload: users,
});
export const LogoutUsersFailure = error => ({
    type: LOGOUT_USERS_FAILURE,
    payload: error,
});

export const LogoutUser = data =>
    async function (dispatch) {
        dispatch(LogoutUsersRequest());
        return postLogoutRequestData(data).then(res => {
            if (res) {

                AsyncStorage.clear()

                dispatch(LogoutUsersSuccess(res));
                return res;
            }
            dispatch(LogoutUsersFailure(res));
        });
    };