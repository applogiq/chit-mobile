/** **************************** Import Types ****************************** */
import {
    POST_PROFILE_REQUEST,
    POST_PROFILE_SUCCESS,
    POST_PROFILE_FAILURE,
} from '../types/postprofileTypes';
import { updateProfile } from '../../api/update';



export const postprofileRequest = () => ({
    type: POST_PROFILE_REQUEST,
});
export const postprofilesuccess = users => ({
    type: POST_PROFILE_SUCCESS,
    payload: users,
});
export const postprofileFailure = error => ({
    type: POST_PROFILE_FAILURE,
    payload: error,
});

export const Postprofile = (userparams, data) =>
    async function (dispatch) {
        dispatch(postprofileRequest());
        return updateProfile(userparams, data).then(res => {
            if (res) {


                dispatch(postprofilesuccess(res));
                return res;
            }
            dispatch(postprofileFailure(res));
        });
    };
