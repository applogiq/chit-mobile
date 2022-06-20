/* eslint-disable */
/** ********************************* Import URL ************************************* */
import { hostConfig } from "../config"; // env
import AsyncStorage from '@react-native-async-storage/async-storage';

/** ****************************** Response Handler *********************************** */


// const token = async () => {
//   return AsyncStorage.getItem("@token").then(result => {
//     const userDetails = JSON.parse(result);
//     console.log(" user token", userDetails?.token?.access_token);
//     return userDetails?.token?.access_token;
//   });
// }



const responseStatusHandler = async (response) => {

  switch (response.status) {
    case 400:
      return response;
    case 401:
      return { error: "Token is missing" };
    case 402:
      return { error: "Payment Required" };
    case 403:
      return { error: "Forbidden" };
    case 404:
      return { error: "Not Found" };
    case 405:
      return { error: "Method Not Allowed" };
    case 406:
      return { error: "Not Acceptable" };
    case 408:
      return { error: "Request Timeout" };
    case 409:
      return { error: "Request Already Exist" };
    case 410:
      return { error: "permanently deleted from server" };
    case 500:
      return { error: "Internal Server Error" };
    case 501:
      return { error: "Not Implemented" };
    case 502:
      return { error: "Bad Gateway" };
    case 503:
      return { error: "Service Unavailable" };
    case 504:
      return { error: " Gateway Timeout" };
    case 511:
      return { error: " Network Authentication Required" };
    case 200:
    case 201:
      return response;
    default:
      return { error : 'response none'};
  }
};
/** ****************************** Error Handler *********************************** */
const errorHandler = (error) => error;



/** ****************************** Create Api *********************************** */
export const postDataApi = async (requestUrl, params) => {
  const dss = await token()
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    //   Token: await token(),
    //   cors: "no-cors"
    },
    body: JSON.stringify(params),
  })
    .then(async (response) => {
      const data = responseStatusHandler(response);
      return data;
    })

    .then((result) => {
      if (!result.error)
        return result.json()
      else
        return result
    }
    )

    .catch((err) => {
      errorHandler(err);
    });
}



/** ****************************** Update Api *********************************** */
export const putDataApi = async (requestUrl, params) => {
    return fetch(`${hostConfig.API_URL}${requestUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Token: await token(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => { return responseStatusHandler(response) })
      .then((result) => {
        return result.status === 200 || result.status === 201 || result.status === 400
          ? result.json()
          : result
      }
      )
      .catch((error) => {
        errorHandler(error);
      });
  };

