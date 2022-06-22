/** ****************************** Import libs *********************************** */
import { deleteDataByIdApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const deleteUser = (id) => deleteDataByIdApi(URL_CONSTANTS.users, id);