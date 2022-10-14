/** **************************** Import Types ****************************** */
import {
  NEWCHITS_REQUEST,
  NEWCHITS_SUCCESS,
  NEWCHITS_FAILURE,
} from '../types/newchitsTypes';
import {getNewChits} from '../../api/get';

export const newchitsRequest = () => ({
  type: NEWCHITS_REQUEST,
});
export const newchitsSuccess = users => ({
  type: NEWCHITS_SUCCESS,
  payload: users,
});
export const newchitsFailure = error => ({
  type: NEWCHITS_FAILURE,
  payload: error,
});

export const getNewchits = params =>
  async function (dispatch) {
    dispatch(newchitsRequest());
    return getNewChits(params)
      .then(res => {
        if (res.records) {
          dispatch(newchitsSuccess(res));
          return res;
        }

        dispatch(newchitsFailure(res));
        return {data: [], error: true};
      })
      .catch(err => console.log('Catch Error:', err));
  };
