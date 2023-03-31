const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const filePath = [path.resolve(__dirname, './dist/static'), path.resolve(__dirname, './public')];
const co = require('co');

let s3 = null;
let productName = 'dev';
let version = process.argv[2];
let filesPath = [];
console.log('当前版本号：' + process.argv[2]);

switch (process.env.REACT_APP_ENV) {
  case 'test':
    productName = 'test';
    break;
  case 'demo':
    productName = 'demo';
    break;
  case 'dev':
    productName = 'dev';
    break;
  case 'qa':
    productName = 'qa';
    break;
  case 'prod':
    productName = 'prod';
    break;
  default:
    break;
}

fs.readFile('./.s3Key.json', 'utf8', async function (err, data) {
  console.log('读取key错误：', err);
  const s3Key = JSON.parse(data?.toString('utf8'));
  s3 = new AWS.S3(s3Key);

  filePath?.forEach((item) => {
    fileDisplay(item);
  });
});

function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      let reg = /node_modules/g;
      files.forEach(function (filename) {
        // 获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        if (!reg.test(filedir)) {
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, (err, stats) => {
            if (err) {
              console.warn('获取文件stats失败');
            } else {
              let isFile = stats.isFile();
              let isDir = stats.isDirectory();
              if (isDir) {
                fileDisplay(filedir);
              }
              if (isFile) {
                upload(filedir);
              }
            }
          });
        }
      });
    }
  });
}

function upload(path) {
  co(function* () {
    let stream = fs.createReadStream(path);

    const params = {
      Bucket: 'static.allmytracks.com',
      Key: version ? `${productName}/${version}/_next/static` : `${productName}/_next/static`,
      Body: stream,
      ContentType: mime.getType(path),
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('文件', path);
        console.log('上传失败，准备重新上传', err);
        upload(path);
      } else {
        console.log(`上传${path}成功`, data);
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}
