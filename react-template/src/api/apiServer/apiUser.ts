import Axios from '@/api/apiConfig/axios';

/**
 *登录
 *
 * @param {string}
 * @param {string}
 *
 * @return {Object} 返回值描述
 */
export const login = async (req: any) => {
  try {
    return await Axios.request({
      url: ``,
      data: req,
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
      url: `/api/v1/user/${data}`,
      method: 'GET',
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};
