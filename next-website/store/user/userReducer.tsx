import constants from './constants';
import { HYDRATE } from 'next-redux-wrapper';
export const initState = {
  server: {},
  client: {
    token: '', //登录获取的token
    userInfo: {}, //用户详情
  },
};

const userReducer = (state = initState, action: { type: constants; payload: any }) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state.server, ...action.payload.userReducer };
    //登录token
    case constants.USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
