const NodeCache = require('node-cache');
const TokenCache = require('../models/TokenCache');
const { Op } = require('sequelize');

const cache = new NodeCache({ stdTTL: 1800, checkperiod: 120 });

class PoetryCache {
  static async put(key, value, ttl = 1800) {
    // Token 相关的缓存使用数据库
    if (key.includes('token')) {
      try {
        const expireAt = new Date(Date.now() + ttl * 1000);
        await TokenCache.upsert({
          cacheKey: key,
          cacheValue: JSON.stringify(value),
          expireAt
        });
        return true;
      } catch (error) {
        console.error('DB cache put error:', error);
        return cache.set(key, value, ttl);
      }
    }
    return cache.set(key, value, ttl);
  }

  static async get(key) {
    // Token 相关的缓存从数据库读取
    if (key.includes('token')) {
      try {
        const record = await TokenCache.findOne({
          where: {
            cacheKey: key,
            expireAt: { [Op.gt]: new Date() }
          }
        });
        return record ? JSON.parse(record.cacheValue) : undefined;
      } catch (error) {
        console.error('DB cache get error:', error);
        return cache.get(key);
      }
    }
    return cache.get(key);
  }

  static async remove(key) {
    if (key.includes('token')) {
      try {
        await TokenCache.destroy({ where: { cacheKey: key } });
      } catch (error) {
        console.error('DB cache remove error:', error);
      }
    }
    return cache.del(key);
  }

  static clear() {
    return cache.flushAll();
  }

  static has(key) {
    return cache.has(key);
  }

  static keys() {
    return cache.keys();
  }
}

module.exports = PoetryCache;
