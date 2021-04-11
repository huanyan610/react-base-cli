import { constants } from './constants';
interface IuserState {
  registerStatus: boolean;
  token: string | undefined;
  userInfo: any;
}
const userState: IuserState = {
  registerStatus: false, //是否注册成功，用于自动跳转路由到登录
  token: '', //登录获取的token
  userInfo: {} //用户详情
};

const userReducer = (state: IuserState = userState, action: { type: constants; payload: any }) => {
  switch (action.type) {
    //登录token
    case constants.USER_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
