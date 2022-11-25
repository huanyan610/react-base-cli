import Axios from '@/api/apiConfig/axios';

/**
 * @description 用户登录
 * @return {Object} 返回值描述
 */
export const login = async (data?: any) => {
  try {
    return await Axios.request({
      url: ``,
      data: data,
      method: 'POST',
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};

/**
 * @description 用户详情查询
 * @return {Object} 返回值描述
 */
export const userInfo = async (data?: any) => {
  try {
    return await Axios.request({
      url: ``,
      params: data,
      method: 'GET',
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};

/**
 * @description 用户退出
 * @return {Object} 返回值描述
 */
export const userLogout = async (data?: any) => {
  try {
    return await Axios.request({
      url: ``,
      params: data,
      method: 'GET',
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};
