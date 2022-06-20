/** ****************************** Import libs *********************************** */
import {  putDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";


export const updatePassword = (params) => putDataApi(URL_CONSTANTS.forgotpassword, params);