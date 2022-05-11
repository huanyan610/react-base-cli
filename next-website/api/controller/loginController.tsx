import Axios from '@api/config/axios';

/**
 * 登录
 * @param {number} loginWay thirdWay 1账号、 2手机、3邮箱、4QQ、 5微信公众号(1：账号+密码,2、3：占位,4：QQ授权码,5：公众号授权码)
 * @param {string} code
 * @param {string} password
 * @param {string} username
 * @return {Object} 返回值描述
 */
export const login = async (data: any) => {
  try {
    return await Axios.request({
      url: ``,
      data,
      method: 'POST',
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};

/**
 * 退出登录
 * @return {Object} 返回值描述
 */
export const loginOut = async () => {
  try {
    return await Axios.request({
      url: ``,
      method: 'GET',
    });
  } catch (e) {
    console.log(e);
    throw e; // 抛出异常
  }
};
