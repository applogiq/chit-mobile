/** ****************************** Import libs *********************************** */
import {putDataByIdApi, putDataApi, changePasswordDataApi} from './actions';
import {URL_CONSTANTS} from './urls';

export const updateUserData = (params, id) =>
  putDataByIdApi(URL_CONSTANTS.updateProfile, params, id);
export const updatePassword = params =>
  putDataApi(URL_CONSTANTS.forgotPassword, params);
export const changePassword = params =>
  changePasswordDataApi(URL_CONSTANTS.forgotPassword, params);
