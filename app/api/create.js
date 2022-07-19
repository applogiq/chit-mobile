/** ****************************** Import libs *********************************** */
import { postDataApi, putDataApi, postOtpApi } from './action';

import { postJoinChitApi } from './action';
import { URL_CONSTANTS } from './urls';

export const postLoginRequestData = params =>
  postDataApi(URL_CONSTANTS.login, params);
export const postLogoutRequestData = params =>
  postDataApi(URL_CONSTANTS.logout, params);
export const postJoinChit = params =>
  postJoinChitApi(URL_CONSTANTS.joinChit, params);
export const changePassword = params =>
  putDataApi(URL_CONSTANTS.changePassword, params);

export const postOtp = params =>
  postOtpApi(URL_CONSTANTS.postOtp, params);

export const verifyOtp = params =>
  putDataApi(URL_CONSTANTS.verifyOtp, params);
