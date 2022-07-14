/** ****************************** Import libs *********************************** */
import { getListByApi } from './action';
import { URL_CONSTANTS } from './urls';

export const getMetalsData = (params) =>
    getListByApi(URL_CONSTANTS.metals, params);
