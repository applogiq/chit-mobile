/** **************************** Import Types ****************************** */
import {
  SCHEME_TRANSACTIONS_SUCCESS,
  SCHEME_TRANSACTIONS_FAILURE,
  SCHEME_TRANSACTIONS_REQUEST,
} from '../types/schemetransactionsTypes';
import {getSchemeTransactions} from '../../api/get';

export const schemetransRequest = () => ({
  type: SCHEME_TRANSACTIONS_REQUEST,
});
export const schemetransSuccess = users => ({
  type: SCHEME_TRANSACTIONS_SUCCESS,
  payload: users,
});
export const schemetransFailure = error => ({
  type: SCHEME_TRANSACTIONS_FAILURE,
  payload: error,
});

export const getSchemetransactions = (userparams, schemeparams) =>
  async function (dispatch) {
    dispatch(schemetransRequest());
    return getSchemeTransactions(userparams, schemeparams)
      .then(res => {
        if (res) {
          dispatch(schemetransSuccess(res));
          return res;
        }

        dispatch(schemetransFailure(res));
        return res;
      })
      .catch(err => console.log('Catch Error:', err));
  };
