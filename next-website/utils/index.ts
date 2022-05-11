/*
 * @Author: your name
 * @Date: 2020-01-16 16:40:21
 * @LastEditTime: 2020-04-08 09:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DDcodeEdu-React\src\utils\index.ts
 */
import { Base64 } from 'js-base64';
import cookies from 'js-cookie';
// 获取url的参数
export const queryString = () => {
  let _queryString: { [key: string]: any } = {};
  const _query = window.location.search.substr(1);
  const _vars = _query.split('&');
  _vars.forEach((v) => {
    const _pair = v.split('=');
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
      _queryString[_pair[0]] = _arr;
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
    }
  });
  return _queryString;
};

/**
 * @description 自定义时间戳转换日期函数，支持指定格式转换
 * @param {*} ms 必填 毫秒级时间参数
 * @param {string} type 可选 转换类型 支持类似 YY-MM-DD hh:mm:ss  YY年MM月DD日 MM-DD hh:mm等格式
 * @returns 默认返回YY年MM月DD日格式
 */
export function getFormatTime(ms: any, type?: string) {
  if (!ms) {
    return '';
  }
  let time: any = new Date(Number(ms)),
    y = time.getFullYear(),
    m: any = time.getMonth() + 1,
    d: any = time.getDate(),
    h: any = time.getHours(),
    min: any = time.getMinutes(),
    sec: any = time.getSeconds(),
    now = new Date(),
    nowY = now.getFullYear();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  if (type) {
    return type
      .replace('YY', y)
      .replace('MM', m)
      .replace('DD', d)
      .replace('hh', h)
      .replace('mm', min)
      .replace('ss', sec);
  }
  return nowY > y ? y + '年' + m + '月' + d + '日' : m + '月' + d + '日';
}

/**毫秒数或中国标准时间转日期 */
export function msToDate(msec: any) {
  let datetime = new Date(msec);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  let second = datetime.getSeconds();

  let result1 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 < 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute) +
    ':' +
    (second + 1 < 10 ? '0' + second : second);

  let result2 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 < 10 ? '0' + date : date);
  let result3 =
    year +
    '年' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '月' +
    (date + 1 < 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute);

  let result4 =
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 <= 10 ? '0' + date : date) +
    '  ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute);

  let result5 =
    year +
    '/' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '/' +
    (date + 1 < 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute);

  let result = {
    hasTime: result1,
    withoutTime: result2,
    cTime: result3,
    simpleTime: result4,
    tchTime: result5,
  };

  return result;
}

//时间区间计算
export function formatTime(time1: any) {
  let time = new Date(parseInt(time1));
  let timestamp = time.getTime();
  let nowstamp = Date.now();
  let differ: any;
  differ = nowstamp - timestamp;
  if (differ < 0) {
    return '';
  }
  if (differ < 3600000) {
    //时间小于1小时
    let min = Math.round(differ / 60000);
    return `${min}分钟前`;
  } else if (differ < 86400000 && differ > 3600000) {
    //时间小于一天
    // let hour = parseInt(differ) / 3600000;
    return '今天'; //`${hour}小时前`;
  } else if (differ < 604800000 && differ > 86400000) {
    //时间小于7天
    let day = Math.round(differ / 86400000);
    return `${day}天前`;
  } else if (differ < 31536000000 && differ > 604800000) {
    //时间小于1年
    let month = time.getMonth();
    let d = time.getDate();
    month += 1;
    return `${month}-${d}`;
  } else if (differ > 31536000000) {
    //时间大于1年
    let year = Math.round(differ / 604800000);
    return `${year}年前`;
  }
}

/*
 *花费时间(以小时记)[向上取分钟整数]
 */
export const timeSpent = (num: any) => {
  let aa = '';
  if (num >= 60 && num < 60 * 24) {
    aa = Math.floor(num / 60) + '小时' + Math.ceil(num % 60) + '分钟';
  } else if (num >= 60 * 24) {
    let myDay = Math.floor(num / 60 / 24);
    let myHour = Math.floor((num - myDay * 60 * 24) / 60);
    let myMinute = (num - myDay * 60 * 24) % 60;
    aa = myDay + '天' + myHour + '小时' + Math.ceil(myMinute) + '分钟';
  } else {
    aa = Math.ceil(num) + '分钟';
  }

  return aa;
};

/**
 * 动态添加javascript
 * @export
 * @param {src: https地址，id：dom节点唯一标识}
 * @returns
 */

export const createScript = (src: string, id: string, cb?: () => void) => {
  let scriptDom: any = document.createElement('script');
  scriptDom.src = src;
  scriptDom.id = id;
  scriptDom.async = true;
  let head = document.getElementsByTagName('body')[0];
  head.appendChild(scriptDom);
  scriptDom.onload = scriptDom.onreadystatechange = function () {
    if (
      !scriptDom.readyState || //这是FF的判断语句，因为ff下没有readyState这个值，IE的readyState肯定有值
      scriptDom.readyState === 'loaded' ||
      scriptDom.readyState === 'complete' // 这是IE的判断语句
    ) {
      cb && cb();
    }
  };
};

/* 检测是否为IOS终端 和 是否是微信浏览器 */
export const checkTerminal = () => {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // const isWX = u.indexOf('MicroMessenger') > -1;
  return isiOS;
};

// 对象数组根据key去重
export const unique = (arr: any, u_key: any) => {
  let map: any = new Map();
  arr.forEach((item: any) => {
    if (!map.has(item[u_key])) {
      map.set(item[u_key], item);
    }
  });
  return [...map.values()];
};

/* json 转换 */

export function param(json: any) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

export function cleanArray(actual: any) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/* 处理课程计划周显示 */

export const judgeWeek = (data: Array<any>) => {
  let weekList = ['一', '二', '三', '四', '五', '六', '日'];
  let result: any = { connect: '每周', sperate: [] };
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let curr = weekList[Number(data[i])];
      if (i < data.length - 1) {
        result.connect += curr + '、';
      } else {
        result.connect += curr;
      }
      result.sperate.push('每周' + curr);
    }

    if (
      data.length === 5 &&
      data.includes('0') &&
      data.includes('1') &&
      data.includes('2') &&
      data.includes('3') &&
      data.includes('4')
    ) {
      result = { connect: '工作日', sperate: ['工作日'] };
    } else if (
      data.length === 7 &&
      data.includes('0') &&
      data.includes('1') &&
      data.includes('2') &&
      data.includes('3') &&
      data.includes('4') &&
      data.includes('5') &&
      data.includes('6')
    ) {
      result = { connect: '每天', sperate: ['每天'] };
    }
  } else {
    result = {
      connect: '暂无计划',
      sperate: ['暂无计划'],
    };
  }

  return result;
};

// 字符串转base64
export function encode(str: string) {
  // 对字符串进行编码
  // 对编码的字符串转化base64
  return Base64.encode(str);
}

export function decode(base64: string) {
  let _base64 = null;
  try {
    _base64 = base64 ? Base64.decode(base64) : base64;
  } catch (e) {
    _base64 = base64;
  }
  return _base64;
}

export const objectTostring = (props: any) => {
  return Object.prototype.toString.call(props);
};

/**
 * @desc build a get request(构建一个带hash值的get请求)
 * @param
 */
export function buildGET(basePort: any, json: any) {
  let buildGet = basePort;
  let fistNumber = 0;
  for (var key in json) {
    let littlePort = '';
    if (json[key] !== null && json[key] !== 'null') {
      if (fistNumber === 0) {
        littlePort = '?' + key + '=' + json[key];
        fistNumber++;
      } else {
        littlePort = '&' + key + '=' + json[key];
      }
      buildGet += littlePort;
    }
  }
  return String(buildGet);
}

export function generateUUID() {
  var d = new Date().getTime();
  if (
    typeof window !== 'undefined' &&
    window.performance &&
    typeof window.performance.now === 'function'
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function eightUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxx4xxxyx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 8) % 8 | 0;
    d = Math.floor(d / 8);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(8);
  });
  return uuid;
}

/**
 * 模拟window.open()
 * @export
 * @param {url}
 * @returns
 */
export function winOpen(url: string) {
  let a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 用于axios的window.open() 需要兼容低版本浏览器
export function winOpenasAxios(url: string) {
  let newPage: any = window.open('about:blank');
  newPage.location.href = url;
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func: any, wait: number, immediate: boolean) {
  let timeout: any;

  return function (this: any) {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func: any, wait: number, type: number) {
  let previous: any;
  let timeout: any;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout = null;
  }
  return function (this: any) {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}

export function splitPhone(str: string) {
  return str ? str.toString().substring(0, 3) + '****' + str.toString().substring(7, 11) : '';
}

export function downloadImg(url: string) {
  let x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    let url = window.URL.createObjectURL(x.response);
    let a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.click();
  };
  x.send();
}
class Validate {
  //身份证校验
  idCard(val: any) {
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(
      val
    );
  }

  //手机号校验
  phone(val: any) {
    return /^1[3456789]\d{9}$/.test(val);
  }

  //邮箱
  email(val: any) {
    return /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(val);
  }

  //普通护照
  passport(val: any) {
    return /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(val);
  }

  //台胞证
  taiwanID(val: any) {
    return /^[a-zA-Z][0-9]{9}$/.test(val);
  }
  //港澳身份证
  hkId(val: any) {
    return /^([A-Z]\d{6,10}(\w1)?)$/.test(val);
  }

  //中文
  chineseWord(val: any) {
    return /^[\u4e00-\u9fa5]*$/.test(val);
  }

  //密码（不能是纯数字或字母）
  psdRxp(val: any) {
    const numberRegexp = /^\d+$/;
    const letterRegexp = /^[a-zA-Z]+$/;
    return numberRegexp.test(val) || letterRegexp.test(val);
  }
  // 纯数字
  onlyNum(val: any) {
    return /^\d{4}$/.test(val);
  }

  // 账号校验
  account(val: any) {
    return val && val.length >= 4;
  }

  // 用户名校验
  usernameRegex(val: any) {
    return /^([a-zA-Z0-9_\u4e00-\u9fa5]{1,8})$/.test(val);
  }

  // 验证URL
  isUrl(val: any) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(val);
  }
}

export const validate = new Validate();

export const jumpToPlay = async (params?: any) => {
  let token = cookies.get('token');
  let isPro = process.env.REACT_APP_ENV === 'production';
  if (token) {
    // 如果token 存在 则将token带过去
    cookies.set('PLAY_TOKEN', token, {
      domain: isPro ? '.dingdangcode.com' : '.dingdangcode.cn',
    });
  }
  let toHost = isPro ? 'https://play.dingdangcode.com' : 'https://play.dingdangcode.cn';
  let curHost = encodeURIComponent(
    isPro ? 'https://vip.dingdangcode.com' : 'https://vip.dingdangcode.cn'
  );
  let _params = params ? { ...params, cburl: curHost } : { cburl: curHost };
  let url = await buildGET(toHost, _params);
  winOpen(url);
};

/**
 * 转换音频时长显示
 * @export
 * @param {url}
 * @returns
 */
export function transTime1(time: any) {
  const duration: any = parseInt(time);
  let minute: any = duration / 60; //parseInt(duration / 60);
  let sec = (duration % 60) + '';
  let isM0 = ':';
  if (parseInt(minute) == 0) {
    minute = '00';
  } else if (parseInt(minute) < 10) {
    minute = '0' + minute;
  }
  if (sec.length == 1) {
    sec = '0' + sec;
  }
  return parseInt(minute) + isM0 + sec;
}

export const backScrollTop = (top?: any) => {
  let body = document.documentElement || document.body;
  body.scrollTop = top || 0;
};

const isPro = process.env.REACT_APP_ENV === 'production';
const isLocal = process.env.REACT_APP_ENV === 'local';

export function domainToken(key: string, data?: any, opts?: any) {
  let _opts = opts || {};
  return {
    set: () => {
      return cookies.set(key, data, {
        domain: isPro ? '.dingdangcode.com' : isLocal ? 'localhost' : '.dingdangcode.cn',
        ..._opts,
      });
    },
    remove: () => {
      return cookies.remove(key, {
        domain: isPro ? '.dingdangcode.com' : isLocal ? 'localhost' : '.dingdangcode.cn',
      });
    },
  };
}
