/** ****************************** Import libs *********************************** */
import {postDataApi} from './action';
import {URL_CONSTANTS} from './urls';

export const postLoginRequestData = params =>
  postDataApi(URL_CONSTANTS.login, params);
