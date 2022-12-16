import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('ZSYL20200707ZSYL'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ZSYL20200707ZSYL'); //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

//解密方法
export function decrypt(word) {
  return CryptoJS.AES.decrypt(word, 'ZSYL20200707ZSYL').toString(CryptoJS.enc.Utf8);
}

//加密方法

export function encrypt(word) {
  if (Object.prototype.toString.call(word) === '[object Object]') {
    // 如果传入的data是json对象，先转义为json字符串
    try {
      word = JSON.stringify(word);
    } catch (error) {
      console.log('error:', error);
    }
  }
  return CryptoJS.AES.encrypt(word, 'ZSYL20200707ZSYL').toString();
}

/**
 * 加密密码专用,参数为空会返回六个星号
 *
 * 表单用六个星号表示不加密
 * @param {string|undefined} password
 * @param {string|undefined} defVal
 * @returns {string}
 */
export function encryptPassword(password, defVal = '******') {
  if (password && typeof password === 'string') {
    return Encrypt(password);
  }

  return defVal;
}
