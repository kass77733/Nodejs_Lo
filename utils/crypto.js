const crypto = require('crypto');
const constants = require('./constants');

class CryptoUtil {
  // MD5加密
  static md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  // AES解密 (对应Java的SecureUtil.aes)
  static aesDecrypt(encryptedData, key = constants.CRYPOTJS_KEY) {
    if (!encryptedData || typeof encryptedData !== 'string') {
      return encryptedData;
    }
    try {
      const keyBuffer = Buffer.from(key, 'utf8');
      const iv = keyBuffer.slice(0, 16);
      const decipher = crypto.createDecipheriv('aes-128-ecb', keyBuffer, Buffer.alloc(0));
      let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      return encryptedData;
    }
  }

  // AES加密
  static aesEncrypt(data, key = constants.CRYPOTJS_KEY) {
    try {
      const keyBuffer = Buffer.from(key, 'utf8');
      const cipher = crypto.createCipheriv('aes-128-ecb', keyBuffer, Buffer.alloc(0));
      let encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    } catch (error) {
      return data;
    }
  }
}

module.exports = CryptoUtil;
