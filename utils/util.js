const { v4: uuidv4 } = require('uuid');
const PoetryCache = require('./cache');
const constants = require('./constants');
const CryptoUtil = require('./crypto');

class PoetryUtil {
  // 从请求中获取Token
  static getToken(req) {
    if (!req || !req.headers) {
      return null;
    }
    const authHeader = req.headers[constants.TOKEN_HEADER.toLowerCase()] || req.headers.authorization;
    let token = authHeader ? String(authHeader).trim() : null;
    if (!token && req.headers && req.headers.cookie) {
      const cookieStr = String(req.headers.cookie);
      const pairs = cookieStr.split(';');
      for (const p of pairs) {
        const [k, v] = p.split('=');
        const key = (k || '').trim().toLowerCase();
        if (key === 'accesstoken' || key === 'token') {
          token = decodeURIComponent(v || '').trim();
          break;
        }
      }
    }
    if (!token && req.query) {
      token = req.query.accessToken || req.query.token || null;
    }
    if (!token && req.body) {
      token = req.body.accessToken || req.body.token || null;
    }
    if (!token) {
      return null;
    }
    token = String(token).trim();
    token = token.replace(/^Bearer\s+/i, '');
    const decrypted = CryptoUtil.aesDecrypt(token);
    return decrypted || null;
  }

  // 从Token中获取用户ID
  static async getUserId(req) {
    const token = this.getToken(req);
    if (!token) {
      return null;
    }
    const user = await PoetryCache.get(token);
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
    
    let ip = req.headers?.['x-forwarded-for'] ||
      req.headers?.['x-real-ip'] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress ||
      null;

    if (ip && typeof ip === 'string' && ip.indexOf(',') > -1) {
      ip = ip.split(',')[0];
    }

    // 处理IPv6格式
    if (ip && typeof ip === 'string' && ip.indexOf('::ffff:') === 0) {
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
