/** ****************************** Import libs *********************************** */
import { postDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const postLoginRequestData = (params) => postDataApi(URL_CONSTANTS.login, params);
export const postRegisterRequestData = (params) => postDataApi(URL_CONSTANTS.signup, params);
