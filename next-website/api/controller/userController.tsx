import Axios from '@/api/config/axios';
import { GAME_URL } from '@/utils/env';
/**
 *
 * @return {Object} 返回值描述
 */
export const userTicket = async (data?: any) => {
  try {
    return await Axios.request({
      url: `${GAME_URL}/api/v1/login/ticket/validate`,
      method: 'POST',
      data,
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};

/**
 *
 * @return {Object} 返回值描述
 */
export const userInfo = async (data?: any) => {
  try {
    return await Axios.request({
      url: `${GAME_URL}/api/v1/login/token/validate`,
      method: 'POST',
      data,
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};
