const PoetryResult = require('../utils/result');
const PoetryCache = require('../utils/cache');
const PoetryUtil = require('../utils/util');
const constants = require('../utils/constants');

/**
 * 登录检查中间件
 * @param {number} userType - 用户类型（0:admin, 1:dev, 2:normal）
 */
const loginCheck = (userType = 2) => {
  return async (req, res, next) => {
    try {
      const token = PoetryUtil.getToken(req);
      
      if (!token) {
        console.log('LoginCheck: No token found in request headers');
        return res.status(401).json(PoetryResult.fail('未登录，请登录后再进行操作！'));
      }

      const user = await PoetryCache.get(token);

      if (!user) {
        console.log('LoginCheck: Token not found in cache:', token);
        return res.status(401).json(PoetryResult.fail('登录已过期，请重新登录！'));
      }

      // 检查token类型和权限（按照原版Java逻辑）
      if (token.includes(constants.USER_ACCESS_TOKEN)) {
        // 用户token：不能访问管理员接口
        if (userType === constants.USER_TYPE_ADMIN || userType === constants.USER_TYPE_DEV) {
          return res.status(403).json(PoetryResult.fail('请输入管理员账号！'));
        }
        // 检查用户类型权限：如果要求的权限级别 < 用户的权限级别，则权限不足
        // 例如：要求dev(1)权限，但用户是normal(2)，则 1 < 2 为false，允许访问
        // 例如：要求admin(0)权限，但用户是normal(2)，则 0 < 2 为true，权限不足
        if (userType < user.userType) {
          return res.status(403).json(PoetryResult.fail('权限不足！'));
        }
      } else if (token.includes(constants.ADMIN_ACCESS_TOKEN)) {
        // 管理员token：可以访问所有接口
        // 如果要求的是admin权限(0)，且用户不是超级管理员
        if (userType === constants.USER_TYPE_ADMIN && user.id !== constants.ADMIN_USER_ID) {
          return res.status(403).json(PoetryResult.fail('请输入管理员账号！'));
        }
        // 检查用户类型权限：如果要求的权限级别 < 用户的权限级别，则权限不足
        if (userType < user.userType) {
          return res.status(403).json(PoetryResult.fail('权限不足！'));
        }
      } else {
        return res.status(401).json(PoetryResult.fail('未登录，请登录后再进行操作！'));
      }

      // 重置过期时间
      const userId = user.id.toString();
      let flag1 = false;
      if (token.includes(constants.USER_ACCESS_TOKEN)) {
        flag1 = !(await PoetryCache.get(constants.USER_TOKEN_INTERVAL + userId));
      } else if (token.includes(constants.ADMIN_ACCESS_TOKEN)) {
        flag1 = !(await PoetryCache.get(constants.ADMIN_TOKEN_INTERVAL + userId));
      }

      if (flag1) {
        // 同步处理（简化实现）
        let flag2 = false;
        if (token.includes(constants.USER_ACCESS_TOKEN)) {
          flag2 = !(await PoetryCache.get(constants.USER_TOKEN_INTERVAL + userId));
        } else if (token.includes(constants.ADMIN_ACCESS_TOKEN)) {
          flag2 = !(await PoetryCache.get(constants.ADMIN_TOKEN_INTERVAL + userId));
        }

        if (flag2) {
          await PoetryCache.put(token, user, constants.TOKEN_EXPIRE);
          if (token.includes(constants.USER_ACCESS_TOKEN)) {
            await PoetryCache.put(constants.USER_TOKEN + userId, token, constants.TOKEN_EXPIRE);
            await PoetryCache.put(constants.USER_TOKEN_INTERVAL + userId, token, constants.TOKEN_INTERVAL);
          } else if (token.includes(constants.ADMIN_ACCESS_TOKEN)) {
            await PoetryCache.put(constants.ADMIN_TOKEN + userId, token, constants.TOKEN_EXPIRE);
            await PoetryCache.put(constants.ADMIN_TOKEN_INTERVAL + userId, token, constants.TOKEN_INTERVAL);
          }
        }
      }

      // 将用户信息附加到请求对象
      req.user = user;
      req.token = token;
      
      next();
    } catch (error) {
      return res.status(500).json(PoetryResult.fail('服务器错误：' + error.message));
    }
  };
};

module.exports = loginCheck;
