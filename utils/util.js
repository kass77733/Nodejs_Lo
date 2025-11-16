const { v4: uuidv4 } = require('uuid');
const PoetryCache = require('./cache');
const constants = require('./constants');

class PoetryUtil {
  // 从请求中获取Token
  static getToken(req) {
    if (!req || !req.headers) {
      return null;
    }
    const authHeader = req.headers[constants.TOKEN_HEADER.toLowerCase()] || req.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const token = String(authHeader).trim();
    return token.replace(/^Bearer\s+/i, '');
  }

  // 从Token中获取用户ID
  static getUserId(req) {
    const token = this.getToken(req);
    if (!token) {
      return null;
    }
    const user = PoetryCache.get(token);
    if (!user) {
      return null;
    }
    return user.id;
  }

  // 生成UUID Token
  static generateToken(prefix) {
    const uuid = uuidv4().replace(/-/g, '');
    return prefix + uuid;
  }

  // 获取客户端IP
  static getIpAddr(req) {
    if (!req) return '';
    
    let ip = req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    if (ip && ip.indexOf(',') > -1) {
      ip = ip.split(',')[0];
    }

    // 处理IPv6格式
    if (ip && ip.indexOf('::ffff:') === 0) {
      ip = ip.substring(7);
    }

    return ip || '';
  }

  // 字符串工具
  static isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  static isNotEmpty(str) {
    return str && str.trim().length > 0;
  }

  // 生成随机验证码
  static generateCode(length = 6) {
    return Math.random().toString().slice(2, 2 + length);
  }
}

module.exports = PoetryUtil;
