/* prettier-ignore */
import Browser from './browser';
/**
 * @desc 1.首先判断系统版本，  XP 系统直接进行访问限制（禁止访问，不显示忽略继续使用），提示下载360浏览器；
 * 2.win7  win10系统 根据浏览器版本，检测结果，低于限制版本且功能不完全的的进行强提醒，忽略后 保留弱提醒，可点击关闭，重新打开后仍存在该提示，
 * 3.根据浏览器版本，检测结果，低于限制版本，功能较完全的进行弱提醒。
 * chrome 内核版本号 核心功能最低支持 chrome/50+ ，所有功能最低支持 chrome 50+
 * @returns
 */
export const checkBrowerVersion = () => {
  let browser = new Browser();
  for (let b in browser) {
    browser[b] = browser[b].toLowerCase();
  }
  let ua = navigator.userAgent.toLowerCase(),
    plt = navigator.platform.toLowerCase(),
    isWin = plt === 'win32' || plt === 'windows' || plt === 'win64',
    checkResult = {
      /* 
        isSupport: Boolean true 支持
        upgrade: Boolean true 需要升级
      */
      isSupport: true,
      upgrade: false,
      prompt: '',
      isWin: isWin,
      winBit: isWin && (ua.indexOf('win64') >= 0 || ua.indexOf('wow64') >= 0) ? '64bit' : '32bit',
      isWinXP: isWinXP(),
    };
  /* 
    判断 xp 系统
  */

  function isWinXP() {
    return (
      ua.indexOf('windows nt 5.0') > -1 ||
      ua.indexOf('windows 2000') > -1 ||
      ua.indexOf('windows nt 5.1') > -1 ||
      ua.indexOf('windows xp') > -1 ||
      ua.indexOf('windows nt 5.2') > -1 ||
      ua.indexOf('windows 2003') > -1 ||
      ua.indexOf('windows nt 6.0') > -1 ||
      ua.indexOf('windows vista') > -1
    );
  }

  function checkIsChorme() {
    // ua
    let isChrome = ua.indexOf('chrome') > -1;
    if (isChrome) {
      let reChorme = new RegExp('chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?');
      return parseFloat(ua.match(reChorme)[1]);
    } else {
      return false;
      // console.log(
      //   '当前内核不是chrome，如果使用的是QQ，遨游，搜狗，360浏览器，请先切换为极速模式。再进行尝试！'
      // )
      // console.log(
      //   '当前内核不是chrome，如果使用的是不支持chrome内核浏览器，根据自身版本控制判断！比如火狐等浏览器'
      // )
    }
  }
  //假定字符串的每节数都在5位以下
  function toNum(_a) {
    let a = _a.toString();
    //也可以这样写 var c=a.split(/\./);
    let c = a.split('.');
    let num_place = ['', '0', '00', '000', '0000'],
      r = num_place.reverse();
    for (let i = 0; i < c.length; i++) {
      let len = c[i].length;
      c[i] = r[len] + c[i];
    }
    let res = c.join('');
    return res;
  }

  /**  
    比较 chrome 版本号 
    @params {
      currVer 当前系统版本， 
      MinVer 核心功能最低支持版本, 
      allMinVer 所有功能最低支持版本，
      needCheck boolean 是否检查是极速模式还是兼容模式
    }
  */
  function compareChromeVersion(currVer, minVer, allMinVer, needCheck) {
    // console.log(
    //   '当前内核不是chrome，如果使用的是QQ，遨游，搜狗，360浏览器，请先切换为极速模式。再进行尝试！'
    // )
    // console.log(
    //   '当前内核不是chrome，如果使用的是不支持chrome内核浏览器，根据自身版本控制判断！比如火狐等浏览器'
    // )
    if (needCheck && !checkIsChorme()) {
      checkResult['prompt'] = '您当前使用的浏览器模式为“兼容模式”，请切换到“极速模式”。';
      checkResult['isSupport'] = false;
      return 'not';
    }
    /* 如果当前版本没有获取到 默认支持所有功能 */
    // if (!currVer) {
    //   console.log('1. 支持所有功能')
    //   checkResult['isSupport'] = true
    //   return 'all'
    // }
    /* 
      all:  支持所有功能
      not: 不支持所有功能
      some: 支持核心功能
    */
    let _a = toNum(currVer),
      _b = toNum(minVer),
      _c = toNum(allMinVer);
    if (_b === _c) {
      /* 核心功能版本和所有功能版本 一致时 */
      if (_a >= _b) {
        console.log('1. 支持所有功能');
        checkResult['isSupport'] = true;
        return 'all';
      } else {
        console.log('2. 不支持所有功能');
        checkResult['prompt'] = '您的浏览器版本过低，无法登录平台，请进行升级';
        checkResult['isSupport'] = false;
        return 'not';
      }
    } else if (_b < _c) {
      if (_a < _b) {
        console.log('3. 不支持所有功能');
        checkResult['prompt'] = '您的浏览器版本过低，无法登录平台，请进行升级';
        checkResult['isSupport'] = false;
        return 'not';
      }
      if (_a > _b && _a < _c) {
        console.log('4. 支持核心功能， 不支持所有功能！');
        checkResult['isSupport'] = true;
        checkResult['upgrade'] = true;
        return 'some';
      } else {
        console.log('5. 支持所有功能');
        checkResult['isSupport'] = true;
        return 'all';
      }
    }
  }
  if (isWinXP()) {
    /* 如果检测是winxp */
    /* chrome/opera 浏览器  核心功能最低支持 chrome/50.0.2661.* ，所有功能最低支持 chrome 50.0.2661.* */
    if (browser.browser.indexOf('chrome') > -1) {
      checkResult['prompt'] = '您的浏览器版本过低，无法登录平台，请进行升级';
      checkResult['isSupport'] = false;
    }
    if (browser.browser.indexOf('opera') > -1) {
      checkResult['prompt'] = '您的浏览器版本过低，无法登录平台，请进行升级';
      checkResult['isSupport'] = false;
    }
  } else {
    /* chrome 浏览器  核心功能最低支持 chrome/50.0.2661.* ，所有功能最低支持 chrome 50.0.2661.* */
    if (browser.browser.indexOf('chrome') > -1) {
      compareChromeVersion(browser.version, '50.0.2661.0', '50.0.2661.0');
    }
    if (browser.browser.indexOf('opera') > -1) {
      compareChromeVersion(browser.version, '37.0.0.0', '37.0.0.0');
    }
  }
  // console.log(browser);
  /* 判断各个浏览器 所用内核版本号 */
  /* 不支持ie */
  if (browser.browser.indexOf('ie') > -1 || browser.engine.indexOf('trident') > -1) {
    checkResult['prompt'] = '您的浏览器版本过低，无法登录平台，请进行升级';
    checkResult['isSupport'] = false;
  }
  /* 火狐浏览器 核心功能最低支持 46.* ，所有功能最低支持 46.* */
  if (browser.browser.indexOf('firefox') > -1) {
    console.log('App Ready: 火狐浏览器');
    compareChromeVersion(browser.version, '47.0', '47.0', false);
  }
  /* 360 安全浏览器 核心功能最低支持 9.1 ，所有功能最低支持 10.0 */
  if (browser.browser.indexOf('360se') > -1) {
    console.log('App Ready: 360 安全浏览器:', browser.version);
    compareChromeVersion(browser.version, '9.2', '9.2', true);
  }
  /* 360 极速浏览器 核心功能最低支持 9.0.1 ，所有功能最低支持 9.5.0 */
  if (browser.browser.indexOf('360ee') > -1) {
    console.log('App Ready: 360 极速浏览器');
    compareChromeVersion(browser.version, '9.1', '9.1', true);
  }
  /* qq浏览器 核心功能最低支持 9.5.3 ，所有功能最低支持 10.0.1 */
  if (browser.browser.indexOf('qqbrowser') > -1) {
    console.log('App Ready: qq 浏览器');
    compareChromeVersion(browser.version, '9.5.4', '9.5.4', true);
  }
  /* 遨游浏览器 核心功能最低支持 5.1.0 ，所有功能最低支持 5.2.1 */
  if (browser.browser.indexOf('maxthon') > -1) {
    console.log('App Ready: 遨游浏览器');
    compareChromeVersion(browser.version, '5.1.1', '5.1.1');
  }
  /* 搜狗浏览器 核心功能最低支持 8.5.7 chrome/50.0.2661.0 ，所有功能最低支持 8.5.7 chrome/50.0.2661.0 */
  if (browser.browser.indexOf('sogou') > -1) {
    let ver = checkIsChorme();
    console.log('App Ready: 搜狗浏览器');
    compareChromeVersion(ver, '59.0.2661.0', '59.0.2661.0', true);
  }
  /* 猎豹浏览器 核心功能最低支持 6.5，所有功能最低支持 6.5 */
  if (browser.browser.indexOf('lbbrowser') > -1) {
    console.log('App Ready: 猎豹浏览器');
    compareChromeVersion(browser.version, '6.6', '6.6', true);
  }
  // console.log('checkResult:', checkResult);
  return checkResult;
};
