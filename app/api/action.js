/* eslint-disable */
/** ********************************* Import URL ************************************* */
import { hostConfig } from '../config/index'; // env
import AsyncStorage from '@react-native-async-storage/async-storage';

/** ****************************** Response Handler *********************************** */

const token = async () => {
  return AsyncStorage.getItem('@token').then(result => {
    const userDetails = JSON.parse(result);
    console.log(' user token', userDetails?.token?.access_token);
    return userDetails?.token?.access_token;
  });
};

const responseStatusHandler = async response => {
  console.log('responjkjjkkjj', response.status, typeof response);
  switch (response.status) {
    case 400:
      return response;
    case 401:
      return { error: 'Token is missing' };
    case 402:
      return { error: 'Payment Required' };
    case 403:
      return { error: 'Forbidden' };
    case 404:
      return { error: 'Not Found' };
    case 405:
      return { error: 'Method Not Allowed' };
    case 406:
      return { error: 'Not Acceptable' };
    case 408:
      return { error: 'Request Timeout' };
    case 409:
      return { error: 'Request Already Exist' };
    case 410:
      return { error: 'permanently deleted from server' };
    case 500:
      return { error: 'Internal Server Error' };
    case 501:
      return { error: 'Not Implemented' };
    case 502:
      return { error: 'Bad Gateway' };
    case 503:
      return { error: 'Service Unavailable' };
    case 504:
      return { error: ' Gateway Timeout' };
    case 511:
      return { error: ' Network Authentication Required' };
    case 200:
    case 201:
      return response;
    default:
      return { error: 'response none' };
  }
};
/** ****************************** Error Handler *********************************** */
const errorHandler = error => error;

/** ****************************** Create Api *********************************** */
export const postDataApi = async (requestUrl, params) => {
  const dss = await token();
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: await token(),
      cors: 'no-cors',
    },
    body: JSON.stringify(params),
  })
    .then(async response => {
      const data = responseStatusHandler(response);
      return data;
    })

    .then(result => {
      if (!result.error) return result.json();
      else return result;
    })

    .catch(err => {
      errorHandler(err);
    });
};

/** ****************************** View Api *********************************** */
export const viewDataByApi = async (requestUrl) =>
  fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: await token(),
    },
  })
    .then(response => {
      return responseStatusHandler(response);
    })
    .then(result => {
      return result.status === 200 ||
        result.status === 201 ||
        result.status === 400
        ? result.json()
        : result;
    })
    .catch(error => {
      errorHandler(error);
    });

/** ****************************** Update Api *********************************** */
export const putDataApi = async (requestUrl, params) => {
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: await token(),
    },
    body: JSON.stringify(params),
  })
    .then(response => {
      return responseStatusHandler(response);
    })
    .then(result => {
      return result.status === 200 ||
        result.status === 201 ||
        result.status === 400
        ? result.json()
        : result;
    })
    .catch(error => {
      errorHandler(error);
    });
};

/** ****************************** Change password Api *********************************** */
export const changePasswordDataApi = (
  requestUrl,
  params,
  id,
  changePasswordToken,
) => {
  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${changePasswordToken}`,
    },
    body: JSON.stringify(params),
  })
    .then(response => responseStatusHandler(response))
    .then(result =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result,
    )
    .catch(error => {
      errorHandler(error);
    });
};

/** ****************************** Delete by Id Api *********************************** */
export const deleteDataByIdApi = async (requestUrl, id) =>
  fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: await token(),
    },
  })
    .then(response => {
      return responseStatusHandler(response);
    })
    .then(result =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result,
    )
    .catch(error => {
      errorHandler(error);
    });
/** ****************************** View with query Api *********************************** */
export const getListByApi = async (requestUrl, params) => {
  let getParams = "?";


  if (
    params &&
    params.token &&
    params.token !== null &&
    params.token !== undefined
  ) {
    getParams += `token=${params.token}`;
  }




  if (
    params &&
    params.userId &&
    params.userId !== null &&
    params.userId !== undefined
  ) {
    getParams += `&userId=${params.userId}`;
  }

  if (
    params &&
    params.search &&
    params.search !== null &&
    params.search !== undefined
  ) {
    getParams += `&search=${params.search}`;
  }

  if (
    params &&
    params.action !== null &&
    params.action !== "" &&
    params.action !== undefined
  ) {
    getParams += `&action=${params.action}`;
  }


  const fcm = await token();
  return fetch(`${hostConfig.API_URL}${requestUrl}${getParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Token: fcm,
    },
  })
    .then((response) => { return responseStatusHandler(response) })
    .then((result) => {
      if (!result.error) {
        return result.json()
      } else {
        return result
      }
    }
    )
    .catch((error) => {
      errorHandler(error);
    });
};



export const getReq = (async (requestUrl) => {
  const fcm = await token();

  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fcm}`,

    },

  }).then((response) => { return responseStatusHandler(response) })
    .then((result) => {
      if (!result.error) {
        return result.json()
      } else {
        return result
      }
    }
    )
    .catch((error) => {
      errorHandler(error);
    });

});

export const getReqparam = (async (requestUrl, params) => {
  const fcm = await token();

  return fetch(`${hostConfig.API_URL}${requestUrl}${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fcm}`,

    },

  }).then((response) => { return responseStatusHandler(response) })
    .then((result) => {
      if (!result.error) {
        return result.json()
      } else {
        return result
      }
    }
    )
    .catch((error) => {
      errorHandler(error);
    });

});