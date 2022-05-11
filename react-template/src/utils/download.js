const superagent = require('superagent');
//下载压缩
function handleStartDownload(file, name) {
  let a = document.createElement('a');
  let blob = file;
  let filename = name;
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    a.download = filename + '.zip';
    var binaryData = [];
    binaryData.push(blob);
    a.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/zip' }));
    a.dispatchEvent(new MouseEvent('click'));
  }
}

function handleRequestFile(url) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .responseType('blob') /// 输出blob对象
      .end((err, res) => {
        console.log('调取返回：', res);
        if (res.xhr.status === 200) {
          resolve(res.xhr.response);
        }
      });
  });
}

export async function downloadFile(url, name) {
  let file = await handleRequestFile(url + '?time=' + new Date().getTime());
  await handleStartDownload(file, name);
}

/**
 * 内联下载
 * @export
 * @param {url}
 * @returns
 */
export function downloadFileUrl(url) {
  let eleLink = document.createElement('a');
  if ('download' in eleLink) {
    eleLink.style.display = 'none';
    eleLink.href = url;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  } else {
    let ifr = document.createElement('iframe');
    ifr.src = url;
    ifr.style.display = 'none';
    ifr.onload = function () {
      document.body.removeChild(ifr);
    };
    document.body.appendChild(ifr);
  }
}
