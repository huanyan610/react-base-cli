import { message } from 'antd';

import { login } from '@/api/apiServer/apiUser';

import { ThunkResult } from '../interface/index';
import { constants } from './constants';

//USER_TOKEN
export const userTokenAction = (payload: any) => ({
  type: constants.USER_TOKEN,
  payload,
});

//用户信息
export const userUserInfoAction = (payload: any) => ({
  type: constants.USER_INFO,
  payload,
});

/**
 * 用户登录
 *
 * @param {Object}
 *
 * @returns {Object}
 */
export const fetchLoginAction = (req: any): ThunkResult<Promise<number | undefined>> => {
  return async (dispatch: any) => {
    let {
      data: { code, data, msg },
    } = await login(req);
    if (code === 0) {
      dispatch(userTokenAction(data));
      message.success(msg);
      return code;
    } else {
      message.error(msg);
    }
  };
};
