export const ssoUrl = () => {
  let url = { loginUrl: '', logoutUrl: '', registerUrl: '' };

  if (process.env.REACT_APP_ENV === 'dev') {
    url.loginUrl = 'http://172.20.32.64:8080/AIGameLogin?service=http://172.20.32.64:8111&source=9';
    url.logoutUrl = `http://172.20.32.64:8080/logout?jumpedBack=${encodeURIComponent(
      url.loginUrl
    )}`;
    url.registerUrl =
      'http://172.20.32.64:8080/AIGameRegister?service=http://172.20.32.64:8111&source=9';
  }
  if (process.env.REACT_APP_ENV === 'pre') {
    url.loginUrl =
      'https://sso2-pre.xingzheai.cn/AIGameLogin?service=https://card-game-pre.xingzheai.cn&source=9';
    url.logoutUrl = `https://sso2-pre.xingzheai.cn/logout?jumpedBack=${encodeURIComponent(
      url.loginUrl
    )}`;
    url.registerUrl =
      'https://sso2-pre.xingzheai.cn/AIGameRegister?service=https://card-game-pre.xingzheai.cn&source=9';
  }
  if (process.env.REACT_APP_ENV === 'qa') {
    url.loginUrl =
      'https://sso2-test.xingzheai.cn/AIGameLogin?service=https://card-game-test.xingzheai.cn&source=9';
    url.logoutUrl = `https://sso2-test.xingzheai.cn/logout?jumpedBack=${encodeURIComponent(
      url.loginUrl
    )}`;
    url.registerUrl =
      'https://sso2-test.xingzheai.cn/AIGameRegister?service=https://card-game-test.xingzheai.cn&source=9';
  }
  if (process.env.REACT_APP_ENV === 'prod') {
    url.loginUrl =
      'https://sso.xingzheai.cn/AIGameLogin?service=https://card-game.xingzheai.cn&source=9';
    url.logoutUrl = `https://sso.xingzheai.cn/logout?jumpedBack=${encodeURIComponent(
      url.loginUrl
    )}`;
    url.registerUrl =
      'https://sso.xingzheai.cn/AIGameRegister?service=https://card-game.xingzheai.cn&source=9';
  }

  return url;
};

export const GAME_ROUTER =
  process.env.REACT_APP_ENV === 'dev'
    ? 'http://172.20.32.64:3001'
    : process.env.REACT_APP_ENV === 'qa'
    ? 'https://gcard-test.xingzheai.cn'
    : process.env.REACT_APP_ENV === 'pre'
    ? 'https://gcard-pre.xingzheai.cn'
    : 'https://gcard.xingzheai.cn';

export const GAME_URL =
  process.env.REACT_APP_ENV === 'dev'
    ? 'https://cardgame-api-test.xingzheai.cn'
    : process.env.REACT_APP_ENV === 'qa'
    ? 'https://cardgame-api-test.xingzheai.cn'
    : process.env.REACT_APP_ENV === 'pre'
    ? 'https://cardgame-api-pre.xingzheai.cn'
    : 'https://cardgame-api.xingzheai.cn';

export const NEWS_URL =
  process.env.REACT_APP_ENV === 'dev'
    ? 'https://qz-manager-test.xingzheai.cn'
    : process.env.REACT_APP_ENV === 'qa'
    ? 'https://qz-manager-test.xingzheai.cn'
    : process.env.REACT_APP_ENV === 'pre'
    ? 'https://qz-manager-pre.xingzheai.cn'
    : 'https://qz-manager.xingzheai.cn';
