/** **************************** Import Types ****************************** */
import {
    JOIN_CHIT_REQUEST,
    JOIN_CHIT_SUCCESS,
    JOIN_CHIT_FAILURE,
} from '../types/joinchitTypes';
import { postJoinChit } from '../../api/create';



export const joinchitRequest = () => ({
    type: JOIN_CHIT_REQUEST,
});
export const joinchitSuccess = users => ({
    type: JOIN_CHIT_SUCCESS,
    payload: users,
});
export const joinchitFailure = error => ({
    type: JOIN_CHIT_FAILURE,
    payload: error,
});

export const JoinChit = data =>
    async function (dispatch) {
        dispatch(joinchitRequest());
        return postJoinChit(data).then(res => {
            if (res) {



                dispatch(joinchitSuccess(res));
                return res;
            }
            dispatch(joinchitFailure(res));
        });
    };