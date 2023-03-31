const fs = require('fs');
const co = require('co');
const path = require('path');

const oss = require('ali-oss');

const startTime = Date.now();

function upload(ossConfig) {
  console.log('Config ------------', ossConfig);
  const dirPath = ossConfig.dirPath;
  const ossPath = ossConfig.ossPath;
  const region = ossConfig.region;
  const accessKeyId = ossConfig.accessKeyId;
  const accessKeySecret = ossConfig.accessKeySecret;
  const bucket = ossConfig.bucket;
  const debug = ossConfig.debug;

  const store = oss({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    bucket: bucket,
  });

  const root = dirPath; //注意这个是个隐藏目录
  const files = [];
  //递归取出所有文件夹下所有文件的路径
  function readDirSync(p) {
    const pa = fs.readdirSync(p);
    pa.forEach((e) => {
      const cur_path = `${p}/${e}`;
      const info = fs.statSync(cur_path);
      if (info.isDirectory()) {
        readDirSync(cur_path);
      } else {
        files.push(cur_path);
      }
    });
  }

  root.forEach((item) => {
    readDirSync(item);
  });

  co(function* () {
    //遍历文件
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index];
      const result = yield store.multipartUpload(ossPath + e.replace(root, ''), e, {
        progress: function* (p) {
          console.log('Progress: ' + p);
        },
      });
      if (debug) {
        console.log(result);
      }
    }
    const endTime = Date.now();
    console.log(`CDN自动打包部署共用时：${(endTime - startTime) / 1000}秒。`);
  });
}

module.exports = {
  upload: upload,
};
