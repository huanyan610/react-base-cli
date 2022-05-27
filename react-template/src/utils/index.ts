/*
 * @Author: your name
 * @Date: 2020-01-16 16:40:21
 * @LastEditTime: 2020-06-05 11:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DDcodeEdu-React\src\utils\index.ts
 */

// 获取url的参数
export const queryString = () => {
  let _queryString: { [key: string]: any } = {};
  const _query = window.location.search.substr(1);
  const _vars = _query.split('&');
  _vars.forEach((v, i) => {
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

  let result6 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 <= 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 <= 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 <= 10 ? '0' + minute : minute);

  let result = {
    hasTime: result1,
    withoutTime: result2,
    cTime: result3,
    simpleTime: result4,
    tchTime: result5,
    resourceTime: result6,
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
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
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
    return val.length >= 4;
  }

  // 用户名校验
  usernameRegex(val: any) {
    return /^([a-zA-Z0-9_\u4e00-\u9fa5]{1,8})$/.test(val);
  }

  // 特殊字符校验
  strRegex(val: any) {
    return /^([a-zA-Z0-9_\u4e00-\u9fa5]{1,})$/.test(val);
  }

  // 验证URL
  isUrl(val: any) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(val);
  }
}

export const validate = new Validate();

export const sleep = (time: number) => {
  return new Promise<void>((resolve, reject) => {
    if (time) setTimeout(() => resolve(), time);
  });
};
