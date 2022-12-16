/* eslint-disable no-useless-escape */
export function validateEmail(email: any) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * validate phone
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone: any) {
  const re = /^1(3|4|5|7|8|9)\d{9}$/;
  return re.test(phone);
}

export const rulePassword = (pass: any) => {
  if (typeof pass === 'string') {
    const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    return passwordReg.test(pass);
  } else {
    return false;
  }
};

export const verifyPassWord = (pass: any) => {
  if (typeof pass === 'string') {
    let patter = /^([A-Za-z0-9]|[~`!@#$%^&*.]){6,16}$/;
    return patter.test(pass);
  } else {
    return false;
  }
};

export const verifyEmail = (s: any) => {
  let myreg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!myreg.exec(s)) return false;
  return true;
};
