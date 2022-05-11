/* eslint-disable */
export const device = () => {
  console.log('device -> navigator.userAgent', navigator.userAgent);
  let UA = navigator.userAgent.toLowerCase(),
    isAndroid = UA.match(/android/i) == 'android',
    isIOS = /iphone|ipad|ipod|ios/.test(UA),
    isMidp = UA.match(/midp/i) == 'midp',
    isUc7 = UA.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
    isUc = UA.match(/ucweb/i) == 'ucweb',
    isCE = UA.match(/windows ce/i) == 'windows ce',
    isWM = UA.match(/windows mobile/i) == 'windows mobile',
    isXM = UA.match(/miuibrowser/i) == 'miuibrowser';
  return isAndroid || isIOS || isMidp || isUc7 || isUc || isWM || isCE || isXM ? 'mobile' : 'pc';
};
