/** ****************************** Import libs *********************************** */

import { putDataApi } from './action';


import { URL_CONSTANTS } from './urls';

export const updateProfile = (userparams, data) =>
    putDataApi(URL_CONSTANTS.updateUser, userparams, data);



