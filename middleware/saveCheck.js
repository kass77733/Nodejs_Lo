const PoetryResult = require('../utils/result');
const PoetryCache = require('../utils/cache');
const PoetryUtil = require('../utils/util');
const constants = require('../utils/constants');

/**
 * SaveCheck 中间件 - 限制保存操作的频率
 * 原版Java的SaveCheckAspect实现
 */
const saveCheck = (req, res, next) => {
  try {
    let flag = false;

    // 检查用户保存次数
    const token = PoetryUtil.getToken(req);
    if (token) {
      const user = PoetryCache.get(token);
      if (user) {
        // 管理员不受限制
        if (user.id === constants.ADMIN_USER_ID) {
          return next();
        }

        // 检查用户保存次数
        let userCount = PoetryCache.get(constants.SAVE_COUNT_USER_ID + user.id.toString());
        if (userCount === null || userCount === undefined) {
          userCount = 0;
        }
        
        const userIdCount = userCount + 1;
        PoetryCache.put(constants.SAVE_COUNT_USER_ID + user.id.toString(), userIdCount, constants.SAVE_EXPIRE);
        
        // 原版逻辑：userIdCount >= SAVE_MAX_COUNT
        if (userIdCount >= constants.SAVE_MAX_COUNT) {
          console.log(`用户保存超限：${user.id}，次数：${userIdCount}`);
          flag = true;
        }
      }
    }

    // 检查IP保存次数
    const ip = PoetryUtil.getIpAddr(req);
    let ipCount = PoetryCache.get(constants.SAVE_COUNT_IP + ip);
    if (ipCount === null || ipCount === undefined) {
      ipCount = 0;
    }
    
    const ipCountNum = ipCount + 1;
    PoetryCache.put(constants.SAVE_COUNT_IP + ip, ipCountNum, constants.SAVE_EXPIRE);
    
    // 原版逻辑：ipCount > SAVE_MAX_COUNT（注意：这里是 >，不是 >=）
    if (ipCountNum > constants.SAVE_MAX_COUNT) {
      console.log(`IP保存超限：${ip}，次数：${ipCountNum}`);
      flag = true;
    }

    if (flag) {
      return res.status(403).json(PoetryResult.fail('今日提交次数已用尽，请一天后再来！'));
    }

    next();
  } catch (error) {
    return res.status(500).json(PoetryResult.fail('服务器错误：' + error.message));
  }
};

module.exports = saveCheck;
