export const verifyTelphone = (phone) => /^1[3456789]\d{9}$/.test(phone);
export const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,32}$/;
export const rulePassword = (pass) => {
  if (typeof pass === 'string') {
    return passwordReg.test(pass);
  } else {
    return false;
  }
};
export const passwordRule = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码长度为6-32位，需至少包含字母、数字、特殊符号中任意两项'));
  } else if (value === '******') {
    callback();
  } else if (!rulePassword(value)) {
    callback(new Error('密码长度为6-32位，需至少包含字母、数字、特殊符号中任意两项'));
  } else {
    callback();
  }
};
