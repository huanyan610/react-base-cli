/*
 * @Author: your name
 * @Date: 2020-04-07 11:27:37
 * @LastEditTime: 2020-04-07 13:11:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \DDcodeEdu-React\src\utils\validate.ts
 */
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email: any) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
