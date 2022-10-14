/** **************************** Import Types ****************************** */
import {
  UPDATE_STATES_SUCCESS,
  UPDATE_STATES_FAILURE,
  UPDATE_STATES_REQUEST,
} from '../types/updatestatesTypes';

export const updatesRequest = () => ({
  type: UPDATE_STATES_REQUEST,
});
export const updatesSuccess = data => ({
  type: UPDATE_STATES_SUCCESS,
  payload: data,
});
export const updatesFailure = error => ({
  type: UPDATE_STATES_FAILURE,
  payload: error,
});

export const updateStates = data =>
  async function (dispatch) {
    dispatch(updatesRequest());

    dispatch(updatesSuccess(data));
    return data;
  };
