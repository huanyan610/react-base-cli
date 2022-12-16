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

//正则校验的正则表达式，这里注意正则表达式中的‘\’要使用‘\\’转义
const patterns = {
  name: '^[a-zA-Z][0-9a-zA-Z_]{0,}$',
  name_1: '^[a-zA-Z_]{0,30}$',
  tel: '^1[2-9]\\d{0,}$',
  email: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
  pwd: '(?!^(d+|[a-zA-Z]+|[~_!@#$%^&*?]+)$)^[w~_!@#$%^&*?]{6,32}$',
  ip: '^(?=(\\b|\\D))(((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))\\.){3}((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))(?=(\\b|\\D))$',
  port: '^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])$',
  idCard: '(^\\d{15}$)|(^\\d{17}([0-9]|X)$)',
  number: '^[0-9]d*$,',
  en_name: '^[a-zA-Z]{0,}$',
  ch_name: '^[\u4E00-\u9FA5]+$',
};

//对应正则表达式的提示信息
const patternMsg = {
  name: '请以字母开头并包括数字、字母、下划线组成',
  name_1: '请输入英文大/小写字母、下划线，不超过30个英文字符',
  tel: '非正确的号码',
  email: '非正确的邮箱地址',
  pwd: '密码长度为6-32位，需至少包含字母、数字、特殊符号(~_!@#$%^&*?)中任意两项',
  ip: '非正确IP地址',
  port: '非正确端口地址',
  idCard: '非正确身份证号码',
  number: '请输入数字',
  en_name: '请输入英文',
  ch_name: '请输入中文',
};

//根据使用的正则返回对应的正则和信息对象
export const pattern = (name, para = 'g') => {
  return {
    pattern: new RegExp(patterns[name], para),
    message: patternMsg[name],
  };
};
