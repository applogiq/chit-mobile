// Regex to allow email format
export const isValidEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};
// General empty cahracters detection
export const isEmpty = text => {
  return text === undefined || text.length === 0;
};

// Regex to allow one capital one small one number and min 6 to max 15 with optional special characters
export const isValidPassword = text => {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,26}$/;
  return reg.test(text);
};

// Regex to allow pure name like  format
export const isValidName = text => {
  let reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  return reg.test(text);
};
