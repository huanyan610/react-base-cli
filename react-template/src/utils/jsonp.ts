import originJsonp from 'jsonp';

export function jsonp(url: string, data?: any, option?: any) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        console.log(data);
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function param(data: any) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}
