/** **************************** Import Types ****************************** */
import {
  LOGIN_USERS_REQUEST,
  LOGIN_USERS_SUCCESS,
  LOGIN_USERS_FAILURE,
} from '../types/loginTypes';
import {postLoginRequestData} from '../../api/create';

import {setAsyncValue} from '../../utils/asyncHelper';

export const LoginUsersRequest = () => ({
  type: LOGIN_USERS_REQUEST,
});
export const LoginUsersSuccess = users => ({
  type: LOGIN_USERS_SUCCESS,
  payload: users,
});
export const LoginUsersFailure = error => ({
  type: LOGIN_USERS_FAILURE,
  payload: error,
});

export const LoginUser = data =>
  async function (dispatch) {
    dispatch(LoginUsersRequest());
    return postLoginRequestData(data).then(res => {
      if (res) {
        const loggedUser = res.records;
        const token = res;
        console.log(
          loggedUser,
          '1####################################################################################################',
        );
        setAsyncValue('@loggedUser', loggedUser);
        setAsyncValue('@token', token);
        dispatch(LoginUsersSuccess(res));
        return res;
      }
      dispatch(LoginUsersFailure(res));
    });
  };
