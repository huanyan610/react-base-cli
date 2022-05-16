import constants from './constants';
import { HYDRATE } from 'next-redux-wrapper';
export const initState = {};

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    case HYDRATE:
      return { ...state, ...action.payload.userReducer };
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
