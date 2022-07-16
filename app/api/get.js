/** ****************************** Import libs *********************************** */

import { getReq } from './action';
import { getReqparam } from './action';
import { getschemeTransactions } from './action';
import { URL_CONSTANTS } from './urls';

export const getMetalsData = (params) =>
    getReq(URL_CONSTANTS.metals, params);

export const getYourChits = (params) =>
    getReqparam(URL_CONSTANTS.yourChits, params);

export const getNewChits = (params) =>
    getReqparam(URL_CONSTANTS.newChits, params);
export const getRecentTransactions = (params) =>
    getReqparam(URL_CONSTANTS.recentTransactions, params);

export const getSchemeTransactions = (userparams, schemeparams) =>
    getschemeTransactions(URL_CONSTANTS.schemeTransactions, userparams, schemeparams);