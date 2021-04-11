import Axios from '@/api/apiConfig/axios';

const interfaceName = 'users';

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
      url: `${interfaceName}/login`,
      data: req,
      method: 'POST'
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};
