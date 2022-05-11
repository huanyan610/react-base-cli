import { getCookie } from '@utils/_cookies';
import { userInfo } from '@api/controller/userController';
// import { loginAction } from '@store/login/action';

/**
 * 进入系统初始化函数，用于用户授权相关
 * @param {Object} ctx
 */
const auth = async function (ctx: any) {
  const { req, reduxStore } = ctx;
  console.log(1110, req);
  try {
    const userId = getCookie('userId', req);
    // 如果token 存在表示已经登录
    if (userId) {
      // 如果存在且token未过期，则将用户数据共享到store中
      const token = getCookie('token', req);

      // 获取用户信息
      if (userId && token) {
        let { data } = await userInfo(token);
        if (data.code === 0) {
          let copyData = { ...data.data };
          delete copyData.token;
          delete copyData.userId;
          // reduxStore.dispatch(
          //   loginAction({
          //     ...copyData,
          //     token,
          //     userId
          //   })
          // );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export default auth;
