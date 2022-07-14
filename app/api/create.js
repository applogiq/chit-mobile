/** ****************************** Import libs *********************************** */
import { postDataApi } from './action';
import { URL_CONSTANTS } from './urls';

export const postLoginRequestData = params =>
  postDataApi(URL_CONSTANTS.login, params);
export const postLogoutRequestData = params =>
  postDataApi(URL_CONSTANTS.logout, params);